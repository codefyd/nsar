import { WHATSAPP_CONFIG } from './config';

/**
 * Generate WhatsApp message URL
 */
export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  // Remove any non-digit characters from phone number
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  return `${WHATSAPP_CONFIG.BASE_URL}/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Replace template variables with actual values
 */
export function replaceTemplateVariables(
  template: string,
  variables: Record<string, string | number>
): string {
  let result = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    result = result.replace(new RegExp(placeholder, 'g'), String(value));
  });
  
  return result;
}

/**
 * Send WhatsApp message by opening WhatsApp Web
 */
export function sendWhatsAppMessage(phoneNumber: string, message: string): void {
  const url = generateWhatsAppUrl(phoneNumber, message);
  window.open(url, '_blank');
}

/**
 * Format phone number for WhatsApp (Saudi Arabia example)
 */
export function formatPhoneForWhatsApp(phoneNumber: string, countryCode: string = '966'): string {
  // Remove all non-digit characters
  let cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // If phone starts with 0, remove it
  if (cleanPhone.startsWith('0')) {
    cleanPhone = cleanPhone.substring(1);
  }
  
  // Add country code if not present
  if (!cleanPhone.startsWith(countryCode)) {
    cleanPhone = countryCode + cleanPhone;
  }
  
  return cleanPhone;
}
