/**
 * ============================================
 * NIKAH PAKISTAN - FIREBASE CONFIGURATION
 * ============================================
 * This file initializes Firebase services (Auth, Firestore, Storage)
 * and exposes them globally for use across the application.
 * 
 * IMPORTANT: Replace the placeholder values below with your actual
 * Firebase project configuration from the Firebase Console.
 * ============================================
 */

'use strict';

// --- Import Firebase modules from CDN ---
// These imports match the modules loaded in index.html
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// --- Firebase Configuration ---
// TODO: Replace these placeholder values with your actual Firebase project settings.
// You can find these in your Firebase Console → Project Settings → General → Your apps → SDK setup and configuration.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",                     // Replace with your actual API key
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // Replace with your authDomain
  projectId: "YOUR_PROJECT_ID",               // Replace with your project ID
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // Replace with your storageBucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your sender ID
  appId: "YOUR_APP_ID",                       // Replace with your app ID
  measurementId: "YOUR_MEASUREMENT_ID"        // Optional (for Analytics)
};

// --- Initialize Firebase ---
let app;
let auth;
let db;
let storage;

try {
  // Initialize the Firebase app
  app = initializeApp(firebaseConfig);
  
  // Initialize individual services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  // Expose services globally for easy access in other scripts
  // Using window object allows any script (even non-modules) to access Firebase.
  window.auth = auth;
  window.db = db;
  window.storage = storage;
  window.firebaseApp = app; // Also expose the app instance if needed
  
  console.log('✅ Firebase initialized successfully for Nikah Pakistan.');
  console.log(`   Project ID: ${firebaseConfig.projectId}`);
} catch (error) {
  console.error('❌ Firebase initialization failed:', error.message);
  console.error('Please check your firebaseConfig values in js/firebase-config.js');
  
  // Optionally, set window flags to prevent further errors
  window.auth = null;
  window.db = null;
  window.storage = null;
  
  // Display a user-friendly message on the page (if possible)
  // This is a fallback; the UI can also check for null services.
  if (typeof document !== 'undefined') {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'background:#c62828; color:white; padding:1rem; text-align:center; position:fixed; top:0; left:0; right:0; z-index:9999;';
    errorDiv.textContent = 'Firebase configuration error. Please contact the administrator.';
    document.body.prepend(errorDiv);
  }
}

// --- Export services for module consumers (optional but good practice) ---
// Although we attach to window, we also export so that other ES modules can import directly.
export { app, auth, db, storage };

// --- Additional Configuration (Optional) ---
// You can set Firestore settings here, e.g., for offline persistence:
// import { enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// enableIndexedDbPersistence(db).catch((err) => {
//   if (err.code === 'failed-precondition') {
//     console.warn('Offline persistence not available (multiple tabs open)');
//   } else if (err.code === 'unimplemented') {
//     console.warn('Browser does not support offline persistence');
//   }
// });
