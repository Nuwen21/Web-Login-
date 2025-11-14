// --- 1. Import functions from the SDKs ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    onAuthStateChanged // <-- We only need this one listener
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// --- 2. Your web app's Firebase configuration ---
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
const loginForm = document.getElementById('login-form');
const signupLink = document.getElementById('signup-link');

// --- 5. Auth State Listener (The Redirect) ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, REDIRECT them to the dashboard
        console.log("User is logged in, redirecting to dashboard...");
        window.location.href = "dashboard.html"; // <-- The redirect
    } else {
        // User is signed out, just stay on this page
        console.log("User is logged out, remaining on login page.");
    }
});

// --- 6. Login Event Listener ---
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Success! The listener above will catch this and redirect.
            console.log('Login successful:', userCredential.user.email);
        })
        .catch((error) => {
            console.error('Login Error:', error.code, error.message);
            alert('Error: ' + error.message);
        });
});

// --- 7. Sign Up Event Listener ---
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    if (!email || !password) {
        alert('Please enter email and password to sign up.');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Success! The listener above will catch this and redirect.
            console.log('Sign up successful:', userCredential.user.email);
        })
        .catch((error) => {
            console.error('Sign Up Error:', error.code, error.message);
            alert('Error: ' + error.message);
        });
});