import { z } from 'zod';

// Letters from any script (\p{L} plus combining marks \p{M}) so French and Arabic names and subjects
// are accepted; markup characters such as < > stay rejected.
const NAME_PATTERN = /^[\p{L}\p{M}\s'.-]+$/u;
const SUBJECT_PATTERN = /^[\p{L}\p{M}\p{N}\s.,!?'&()؟،:;/-]+$/u;

// Type for translation function
type TranslateFn = (key: string) => string;

// Factory function to create contact form validation schema with translations
export const createContactFormSchema = (t: TranslateFn) => {
    return z.object({
        name: z
            .string()
            .min(2, t('validation.nameMin'))
            .max(100, t('validation.nameMax'))
            .regex(NAME_PATTERN, t('validation.nameInvalid')),
        
        email: z
            .string()
            .email(t('validation.emailInvalid'))
            .max(254, t('validation.emailMax'))
            .transform(val => val.toLowerCase().trim()),
        
        subject: z
            .string()
            .min(5, t('validation.subjectMin'))
            .max(200, t('validation.subjectMax'))
            .regex(SUBJECT_PATTERN, t('validation.subjectInvalid')),
        
        message: z
            .string()
            .min(20, t('validation.messageMin'))
            .max(2000, t('validation.messageMax')),
        
        // Honeypot field - should be empty
        website: z.string().max(0).optional(),
    });
};

// Default schema for server-side validation (English)
export const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must not exceed 100 characters')
        .regex(NAME_PATTERN, 'Name contains invalid characters'),
    
    email: z
        .string()
        .email('Invalid email address')
        .max(254, 'Email must not exceed 254 characters')
        .transform(val => val.toLowerCase().trim()),
    
    subject: z
        .string()
        .min(5, 'Subject must be at least 5 characters')
        .max(200, 'Subject must not exceed 200 characters')
        .regex(SUBJECT_PATTERN, 'Subject contains invalid characters'),
    
    message: z
        .string()
        .min(20, 'Message must be at least 20 characters')
        .max(2000, 'Message must not exceed 2000 characters'),
    
    // Honeypot field - should be empty
    website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
