/**
 * ============================================
 * NIKAH PAKISTAN - UNIVERSAL CONFIGURATION & HELPERS
 * ============================================
 * 
 * This file contains global configuration values and reusable helper functions.
 * Include this script on EVERY page to ensure consistent site-wide settings.
 * 
 * IMPORTANT: Replace the placeholder values below with your actual information.
 * ============================================
 */

'use strict';

// ---------- GLOBAL CONFIGURATION OBJECT ----------
const NIKAH_CONFIG = {
  // Site Identity
  siteName: 'Nikah Pakistan',
  siteUrduName: 'نکاح پاکستان',
  
  // Admin Contact Information (REPLACE THESE PLACEHOLDERS!)
  adminWhatsApp: '923001234567',        // Country code + number, NO '+' or spaces
  adminContactRaw: '923001234567',      // Same as above, used for WhatsApp links
  supportEmail: 'help@nikahpakistan.com',
  
  // Default Settings
  defaultAgeRange: 5,                   // ±5 years for default filtering
  currencySymbol: '₨',
  
  // Feature Flags
  enablePhotoModeration: false,         // Future: require admin approval for photos
};

// ---------- HELPER FUNCTIONS ----------

/**
 * Formats a number as Pakistani Rupees.
 * @param {number} amount - The amount to format.
 * @returns {string} Formatted currency string (e.g., "₨ 50,000").
 */
function formatCurrency(amount) {
  if (amount === null || amount === undefined) return `${NIKAH_CONFIG.currencySymbol} 0`;
  const num = Number(amount);
  if (isNaN(num)) return `${NIKAH_CONFIG.currencySymbol} 0`;
  return `${NIKAH_CONFIG.currencySymbol} ${num.toLocaleString('en-PK')}`;
}

/**
 * Returns the opposite gender.
 * @param {string} gender - 'Male' or 'Female'.
 * @returns {string} Opposite gender, or empty string if invalid.
 */
function getOppositeGender(gender) {
  if (gender === 'Male') return 'Female';
  if (gender === 'Female') return 'Male';
  return '';
}

/**
 * Calculates default age range based on a given age.
 * @param {number} age - The user's age.
 * @returns {{min: number, max: number}} Min and max ages (clamped to 18-100).
 */
function getDefaultAgeRange(age) {
  const range = NIKAH_CONFIG.defaultAgeRange;
  let min = Math.max(18, age - range);
  let max = age + range;
  return { min, max };
}

/**
 * Updates the footer across the site with values from NIKAH_CONFIG.
 * Looks for elements with specific data attributes or classes.
 * This function is called automatically on DOMContentLoaded.
 */
function updateGlobalFooter() {
  // Update site name in footer (elements with class 'js-site-name')
  const siteNameElements = document.querySelectorAll('.js-site-name');
  siteNameElements.forEach(el => {
    el.textContent = NIKAH_CONFIG.siteName;
  });
  
  // Update Urdu site name
  const urduNameElements = document.querySelectorAll('.js-site-urdu-name');
  urduNameElements.forEach(el => {
    el.textContent = NIKAH_CONFIG.siteUrduName;
  });
  
  // Update contact/WhatsApp info (elements with class 'js-footer-contact')
  const contactElements = document.querySelectorAll('.js-footer-contact');
  contactElements.forEach(el => {
    if (el.tagName === 'A') {
      el.href = `https://wa.me/${NIKAH_CONFIG.adminWhatsApp}`;
      el.textContent = `WhatsApp: +${NIKAH_CONFIG.adminWhatsApp}`;
    } else {
      el.textContent = `+${NIKAH_CONFIG.adminWhatsApp}`;
    }
  });
  
  // Update support email
  const emailElements = document.querySelectorAll('.js-support-email');
  emailElements.forEach(el => {
    if (el.tagName === 'A') {
      el.href = `mailto:${NIKAH_CONFIG.supportEmail}`;
    }
    el.textContent = NIKAH_CONFIG.supportEmail;
  });
  
  // Update copyright year dynamically
  const yearElements = document.querySelectorAll('.js-current-year');
  yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

// ---------- EXPOSE GLOBALLY ----------
// Make config and helpers available to all other scripts
window.NIKAH_CONFIG = NIKAH_CONFIG;
window.formatCurrency = formatCurrency;
window.getOppositeGender = getOppositeGender;
window.getDefaultAgeRange = getDefaultAgeRange;
window.updateGlobalFooter = updateGlobalFooter;

// ---------- AUTO-RUN ON PAGE LOAD ----------
document.addEventListener('DOMContentLoaded', () => {
  updateGlobalFooter();
  console.log(`✅ ${NIKAH_CONFIG.siteName} universal config loaded.`);
});
