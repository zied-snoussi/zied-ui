/**
 * @file lib/utils/format.ts
 * @description Formatting utility functions
 */

/**
 * Format a date string to a more readable format
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Truncate text to a specific length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\d{3})(\d{2})(\d{3})(\d{3})/, '+$1 $2 $3 $4')
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function formatNumber(num: number | undefined | null): string {
    // Handle undefined, null, or NaN values
    if (num === undefined || num === null || isNaN(num)) {
        return '0';
    }
    
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
