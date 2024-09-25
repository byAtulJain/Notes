import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkX_Aa5j4fzZQOHoS1A-goRBth0HDsn44",
    authDomain: "notestaking-f1ca8.firebaseapp.com",
    projectId: "notestaking-f1ca8",
    storageBucket: "notestaking-f1ca8.appspot.com",
    messagingSenderId: "102734400942",
    appId: "1:102734400942:web:44df948f0e559da5accc3f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const createAccountLink = document.getElementById('create-account-link');
  const loginLink = document.getElementById('login-link');
  const loginSection = document.getElementById('login-section');
  const signupSection = document.getElementById('signup-section');

  // Handle login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = 'index.html';
    } catch (error) {
      alert('Error logging in:', error.message);
    }
  });

  // Handle signup
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = 'index.html';
    } catch (error) {
      alert('Error creating account:', error.message);
    }
  });

  // Toggle between login and signup sections
  createAccountLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.style.display = 'none';
    signupSection.style.display = 'block';
  });

  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.style.display = 'block';
    signupSection.style.display = 'none';
  });
});
