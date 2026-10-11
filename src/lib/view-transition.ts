/**
 * @file lib/view-transition.ts
 * @description Shared-element "morph" between a project card and the project page, using the
 * browser View Transitions API (Chrome, Edge, Safari 18+). Browsers without it, and visitors who
 * prefer reduced motion, get a normal navigation.
 *
 * How it works: the clicked card's image/title get a `view-transition-name`, the browser snapshots
 * them, we navigate, and once the project page's elements (which carry the same names) are in the
 * DOM the browser animates old -> new.
 */

export const VT_IMAGE = 'project-image';
export const VT_TITLE = 'project-title';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void> | void) => { ready: Promise<void>; finished: Promise<void> };
};

export function canMorph(): boolean {
  return (
    typeof document !== 'undefined' &&
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Resolves when `selector` exists in the DOM (or after `timeout` ms, so navigation never hangs).
 * Polls with timers: requestAnimationFrame is paused while a view transition is capturing.
 */
function waitFor(selector: string, timeout = 2500): Promise<Element | null> {
  return new Promise((resolve) => {
    const start = performance.now();
    const check = () => {
      const el = document.querySelector(selector);
      if (el || performance.now() - start > timeout) resolve(el);
      else setTimeout(check, 16);
    };
    check();
  });
}

// A short timer rather than requestAnimationFrame, which doesn't fire during the capture phase
const nextFrame = () => new Promise<void>((resolve) => setTimeout(resolve, 16));

function name(el: Element | null | undefined, value: string) {
  if (el instanceof HTMLElement) el.style.viewTransitionName = value;
}

/**
 * Card -> project page.
 * `card` is the card element containing `[data-vt="image"]` and `[data-vt="title"]`.
 */
export function morphToProject(card: HTMLElement, navigate: () => void) {
  const doc = document as ViewTransitionDocument;
  if (!canMorph() || !doc.startViewTransition) return navigate();

  const image = card.querySelector('[data-vt="image"]');
  const title = card.querySelector('[data-vt="title"]');
  name(image, VT_IMAGE);
  name(title, VT_TITLE);

  const transition = doc.startViewTransition(async () => {
    navigate();
    await waitFor('[data-vt-page="project"]');
    // The router scrolls to the top a bit later; do it now so the "after" snapshot shows the page header
    window.scrollTo({ top: 0, behavior: 'instant' });
    await nextFrame();
  });
  // A skipped transition (e.g. slow page) rejects ready; the navigation itself still happens
  transition.ready.catch(() => {});
  transition.finished.finally(() => {
    name(image, '');
    name(title, '');
  });
}

/**
 * Project page -> back to the card on the home page (if that card is rendered; otherwise a crossfade).
 */
export function morphBackToCard(projectId: string, navigate: () => void) {
  const doc = document as ViewTransitionDocument;
  if (!canMorph() || !doc.startViewTransition) return navigate();

  let card: Element | null = null;
  const transition = doc.startViewTransition(async () => {
    navigate();
    card = await waitFor(`[data-project-card="${projectId}"]`);
    // Make sure the card is on screen so the image can fly back into it
    if (card) card.scrollIntoView({ block: 'center', behavior: 'instant' });
    await nextFrame();
    name(card?.querySelector('[data-vt="image"]'), VT_IMAGE);
    name(card?.querySelector('[data-vt="title"]'), VT_TITLE);
  });
  // A skipped transition (e.g. slow page) rejects ready; the navigation itself still happens
  transition.ready.catch(() => {});
  transition.finished.finally(() => {
    name((card as Element | null)?.querySelector('[data-vt="image"]'), '');
    name((card as Element | null)?.querySelector('[data-vt="title"]'), '');
  });
}
