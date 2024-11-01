document.getElementById('add-note').addEventListener('click', async () => {
  const type = document.getElementById('type').value;
  const content = document.getElementById('content').value;

  if (content) {
    await fetch('http://localhost:3000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, content })
    });
    loadNotes();
    document.getElementById('content').value = '';
  }
});

async function loadNotes() {
  const response = await fetch('http://localhost:5000/api/notes');
  const notes = await response.json();
  displayNotes(notes);
}

document.getElementById('filter-notes').addEventListener('click', async () => {
  const month = document.getElementById('month-filter').value;
  if (month) {
    const [year, monthValue] = month.split('-');
    const response = await fetch('http://localhost:5000/api/notes');
    const notes = await response.json();
    const filteredNotes = notes.filter(note => {
      const noteDate = new Date(note.createdAt);
      return noteDate.getFullYear() === parseInt(year) && (noteDate.getMonth() + 1) === parseInt(monthValue);
    });
    displayNotes(filteredNotes);
  }
});

function displayNotes(notes) {
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';
  notes.forEach(note => {
    const noteDiv = document.createElement('div');
    noteDiv.className = `note ${note.type}`;
    noteDiv.innerHTML = `<p><strong>Tipo:</strong> ${note.type}</p><p>${note.content}</p><p><small>Fecha: ${new Date(note.createdAt).toLocaleString()}</small></p>`;
    notesList.appendChild(noteDiv);
  });
}

loadNotes();
