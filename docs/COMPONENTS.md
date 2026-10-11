# Component catalog

Run `pnpm storybook` for live examples, controls and generated prop tables. This page is the written reference.

## `@zied-snoussi/ui` (primitives)

| Component | Key props | Notes |
|---|---|---|
| `Button` | `variant`: default · secondary · outline · ghost · destructive · link; `size`: default · sm · lg · icon; `asChild` | `buttonVariants()` for link styling |
| `Badge` | `variant`: default · secondary · outline · destructive | `badgeVariants()` |
| `Card` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` | Layout only, no props of its own |
| `Avatar` | `Avatar`, `AvatarImage` (`src`, `alt`), `AvatarFallback` | Fallback shows while loading or on error |
| `Carousel` | `opts`, `plugins`, `orientation`, `setApi`; `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` | Embla. Keyboard arrows supported |
| `Dialog` | Radix `Root` props (`open`, `onOpenChange`, `defaultOpen`); `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` | Focus trap, Escape closes |
| `Sheet` | Same as Dialog; `SheetContent` `side`: top · right · bottom · left | Mobile navigation |
| `DropdownMenu` | Radix dropdown parts (`Trigger`, `Content`, `Item`, `Label`, `Separator`, `CheckboxItem`, `RadioGroup`, `Sub`…) | Language switcher |
| `Tabs` | `defaultValue` / `value`, `onValueChange`; `TabsList`, `TabsTrigger`, `TabsContent` | Category filters |
| `ScrollArea` | `className` (set a height); `ScrollBar` `orientation` | Custom scrollbars |
| `Separator` | `orientation`: horizontal · vertical; `decorative` | |

Utilities: `cn(...classes)`, `formatNumber(n)` (1.2K / 3.4M), `formatDate(iso)`, `truncateText(text, max)`. Hooks: `useMediaQuery(query)`, `useIsMobile()`, `useIsTablet()`, `useIsDesktop()`, `useScrollToTop()`.

## `@zied-snoussi/ui/effects`

| Component | Key props | Notes |
|---|---|---|
| `SectionHeading` | `index`, `label`, `title`, `description?`, `align`: left · center | Numbered "circuit" heading used by every section |
| `NodeCluster` | `className` | Decorative SVG node cluster |
| `Trace` + `CircuitDefs` + `elbowPath(from, to, axis, mid?, radius?)` | `d`, `active`, `highlight` | Animated connector lines; render inside an `<svg>` that contains `<CircuitDefs />` |
| `Particles` | `particleCount`, `particleSpread`, `speed`, `particleColors`, `moveParticlesOnHover`, `particleHoverFactor`, `alphaParticles`, `particleBaseSize`, `sizeRandomness`, `cameraDistance`, `disableRotation`, `pixelRatio` | WebGL (OGL). Give the parent a size and `position: relative` |
| `DomeGallery` | `images` (string or `{ src, alt }`), `segments`, `fit`, `minRadius`, `maxRadius`, `grayscale`, `imageBorderRadius`, `dragSensitivity`, `dragDampening`, `onItemClick` | Draggable 3D sphere of images; click to enlarge |
| `Fade` | `top` · `bottom` · `left` · `right`, `delay` (ms), `className` | Reveal on scroll (IntersectionObserver) |

## `@zied-snoussi/ui/next`

All components need `NextIntlClientProvider`; `ThemeToggle` needs `ThemeProvider`.

| Component | Props | Messages namespace |
|---|---|---|
| `ThemeProvider` | next-themes props (`attribute="class"`, `defaultTheme`, `enableSystem`…) | — |
| `Navbar` | — | `Navbar` |
| `Footer` | — | `Footer` |
| `LanguageSwitcher` | — (switches between `en`, `fr`, `ar` with the next-intl router) | `Common` |
| `ThemeToggle` | — | — |
| `SectionHeader` | `badge`, `title`, `subtitle?` | — |
| `ScrollToTop` | — (appears after the first screen) | `Common` |
| `ProjectCard` | `project` (`title`, `photoUrl`, `date`, `description`, `skills`, `githubUrl`, `demoUrl`), `projectId` | `Projects` |
| `AIChatbot` | — (floating launcher + window; calls `/api/chat`) | `AskBot` |
| `ChatWindow` | `isOpen`, `name`, `messages`, `isLoading`, `input`, `inputRef`, `onClose`, `onInputChange`, `onSend`, `onKeyDown`, `placeholder?` | — |
| `ChatMessage` | `role`: user · assistant, `content` (Markdown), `timestamp` | — |
| `ChatMessages` | `messages`, `isLoading` | — |
| `ChatInput` | `value`, `onChange`, `onSend`, `onKeyDown`, `isLoading`, `placeholder?` (forwards a textarea ref) | — |
| `ChatHeader` | `name`, `onClose` | — |
| `ChatMarkdown` | `content` | Lightweight Markdown: headings, lists, bold, italics, code, links |
| `RobotSvg` / `RobotLauncher` | `className` / `onClick`, `hidden`, `label`, `hello` | — |
| `askChatbot(prompt?)` | Opens the chatbot (and sends `prompt`) from anywhere | — |

## Storybook-only

| Group | Stories |
|---|---|
| Sections | Home (hero with particles), About, Work, Education, Skills, Projects, GitHub stats, Ask the bot, Contact |
| Features | ProjectDetail (full project page) |
| Pages | Portfolio (the complete one-page site) |
