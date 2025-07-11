
import DOMPurify from 'isomorphic-dompurify';

// Types pour la validation
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Sanitisation des inputs
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  // Nettoyer les balises HTML malveillantes
  const cleaned = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [], 
    ALLOWED_ATTR: [] 
  });
  
  // Échapper les caractères spéciaux
  return cleaned
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#x27;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim();
};

// Validation des emails
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Validation des numéros de téléphone
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s-()]/g, ''));
};

// Validation générique
export const validateField = (value: string, rules: ValidationRule): ValidationResult => {
  const errors: string[] = [];
  const sanitizedValue = sanitizeInput(value);

  if (rules.required && !sanitizedValue) {
    errors.push('Ce champ est obligatoire');
  }

  if (sanitizedValue && rules.minLength && sanitizedValue.length < rules.minLength) {
    errors.push(`Minimum ${rules.minLength} caractères requis`);
  }

  if (sanitizedValue && rules.maxLength && sanitizedValue.length > rules.maxLength) {
    errors.push(`Maximum ${rules.maxLength} caractères autorisés`);
  }

  if (sanitizedValue && rules.pattern && !rules.pattern.test(sanitizedValue)) {
    errors.push('Format invalide');
  }

  if (sanitizedValue && rules.custom && !rules.custom(sanitizedValue)) {
    errors.push('Valeur non autorisée');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Détection de tentatives d'injection
export const detectInjectionAttempt = (input: string): boolean => {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /union\s+select/i,
    /drop\s+table/i,
    /exec\s*\(/i,
    /eval\s*\(/i
  ];

  return suspiciousPatterns.some(pattern => pattern.test(input));
};

// Rate limiting côté client
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];

    // Filtrer les tentatives dans la fenêtre de temps
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    // Ajouter la nouvelle tentative
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);

    return true;
  }

  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length < this.maxAttempts) return 0;

    const oldestAttempt = Math.min(...attempts);
    const remaining = this.windowMs - (Date.now() - oldestAttempt);
    return Math.max(0, remaining);
  }
}

export const loginRateLimiter = new RateLimiter(3, 15 * 60 * 1000); // 3 tentatives par 15 minutes
export const formRateLimiter = new RateLimiter(10, 60 * 1000); // 10 soumissions par minute
