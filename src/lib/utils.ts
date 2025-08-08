import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format a date to YYYY-MM-DD string (ISO format without time)
export function formatDateToYYYYMMDD(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Parse a YYYY-MM-DD string to a Date object without timezone issues
export function parseYYYYMMDDToDate(dateStr: string): Date {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date(); // Return current date if invalid format
  }
  
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Format a date to DD/MM/YYYY (Brazilian format)
export function formatDateToPtBR(date: Date | string): string {
  try {
    let dateObj: Date;
    
    if (typeof date === 'string') {
      // If it's a YYYY-MM-DD string
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        const [year, month, day] = date.split('-').map(Number);
        dateObj = new Date(year, month - 1, day);
      } else {
        // Try to parse as regular date string
        dateObj = new Date(date);
      }
    } else {
      dateObj = date;
    }
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    
    return dateObj.toLocaleDateString('pt-BR');
  } catch (e) {
    console.error('Error formatting date:', e);
    return String(date);
  }
}

// Format CNPJ string to XX.XXX.XXX/XXXX-XX format
export function formatCNPJ(cnpj: string): string {
  // Remove any non-numeric characters
  const numericCNPJ = cnpj.replace(/\D/g, '');
  
  // If the CNPJ doesn't have at least 14 digits, return as is
  if (numericCNPJ.length !== 14) {
    return cnpj;
  }
  
  // Format as XX.XXX.XXX/XXXX-XX
  return numericCNPJ.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

// Apply CNPJ mask as the user types
export function applyCNPJMask(value: string): string {
  // Remove any non-numeric characters
  const numericValue = value.replace(/\D/g, '');
  
  // Apply the mask progressively
  if (numericValue.length <= 2) {
    return numericValue;
  }
  if (numericValue.length <= 5) {
    return `${numericValue.slice(0, 2)}.${numericValue.slice(2)}`;
  }
  if (numericValue.length <= 8) {
    return `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5)}`;
  }
  if (numericValue.length <= 12) {
    return `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5, 8)}/${numericValue.slice(8)}`;
  }
  
  return `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5, 8)}/${numericValue.slice(8, 12)}-${numericValue.slice(12, 14)}`;
}
