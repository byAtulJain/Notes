import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const addNoteBtn = document.getElementById('add-note-btn');
  const noteInput = document.getElementById('note-input');
  const notesContainer = document.getElementById('notes');
  const logoutBtn = document.getElementById('logout-btn');
  const userEmail = document.getElementById('user-email');

  // Toggle dark mode
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Handle logout
  logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'login.html';
  });

  // Handle auth state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userEmail.textContent = user.email;
      noteInput.disabled = false;
      addNoteBtn.disabled = false;
      renderNotes(user.uid);
    } else {
      window.location.href = 'login.html';
    }
  });

  // Add note
  addNoteBtn.addEventListener('click', async () => {
    const noteText = noteInput.value.trim();
    if (noteText && auth.currentUser) {
      await addDoc(collection(db, 'notes'), {
        text: noteText,
        uid: auth.currentUser.uid,
      });
      renderNotes(auth.currentUser.uid);
      noteInput.value = '';
    }
  });

  // Render notes
  async function renderNotes(uid) {
    notesContainer.innerHTML = '';
    const q = query(collection(db, 'notes'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const noteElement = document.createElement('div');
      noteElement.className = 'note';
      noteElement.innerHTML = `
        <p>${doc.data().text}</p>
        <button data-id="${doc.id}" class="delete-note-btn">Delete</button>
      `;
      notesContainer.appendChild(noteElement);
    });

    // Add event listeners to delete buttons
    const deleteNoteBtns = document.querySelectorAll('.delete-note-btn');
    deleteNoteBtns.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        await deleteDoc(doc(db, 'notes', id));
        renderNotes(uid);
      });
    });
  }
});
