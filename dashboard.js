// --- 1. Import functions from the SDKs ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
    getAuth, 
    signOut,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// --- 2. Your Firebase Config (Copy from app.js) ---
const firebaseConfig = {
  apiKey: "AIzaSyA9CA8zb0BltMzwJrzQ3-MjqcjIyioEacI",
  authDomain: "new-project-ceefc.firebaseapp.com",
  projectId: "new-project-ceefc",
  storageBucket: "new-project-ceefc.firebasestorage.app",
  messagingSenderId: "195146910928",
  appId: "1:195146910928:web:f052bfe1beed9f51a0e2d5",
  measurementId: "G-F20TQY4DMJ"
};

// --- 3. Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- 4. Get DOM Elements ---
const logoutButton = document.getElementById('logout-button');
const userEmailDisplay = document.getElementById('user-email-display');

// --- 5. Auth State Listener (The "Bouncer") ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, show their info
        console.log("Dashboard: User is logged in", user.email);
        userEmailDisplay.textContent = user.email;
    } else {
        // User is signed out, REDIRECT them back to login
        console.log("Dashboard: No user found, redirecting to login.");
        window.location.href = "index.html"; // <-- Kicks them out
    }
});

// --- 6. Logout Button ---
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        // The listener above will catch this and redirect.
        console.log("User logged out.");
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
});