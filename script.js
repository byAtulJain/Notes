document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const addNoteBtn = document.getElementById('add-note-btn');
    const noteInput = document.getElementById('note-input');
    const notesContainer = document.getElementById('notes');

    // Load notes from localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Toggle dark mode
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Add note
    addNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText) {
            notes.push(noteText);
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
            noteInput.value = '';
        }
    });

    // Render notes
    function renderNotes() {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <p>${note}</p>
                <button onclick="deleteNote(${index})">Delete</button>
            `;
            notesContainer.appendChild(noteElement);
        });
    }

    // Delete note
    window.deleteNote = (index) => {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    };

    // Initial render
    renderNotes();
});
