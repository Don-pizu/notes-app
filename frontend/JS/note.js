// Set the backend API URL
const API = 'http://localhost:5000/api'; // Uncomment this for local testing

//const API = 'https://blog-api-4zax.onrender.com/api'; // Production backend

// Get token from localStorage 
const token = localStorage.getItem("token");
if (!token) window.location.href = "index.html";


// Logout
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});
// Create note
document.getElementById("noteForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const tags = document.getElementById("tags").value.split(",").map(t => t.trim()).filter(Boolean);

  const res = await fetch(`${API}/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ title, content, tags })
  });

  if (res.ok) {
    document.getElementById("noteForm").reset();  //Reset the note form
    loadNotes();
  } else {
    alert("Failed to create note");
  }
});


// Load all notes
async function loadNotes() {
  const res = await fetch(`${API}/note`, {
    headers: { "Authorization": "Bearer " + token }
  });

  const notes = await res.json();

  const list = document.getElementById("notesList");
  list.innerHTML = "";

  notes.forEach(note => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <p><b>Tags:</b> ${note.tags.join(", ")}</p>
      <button class="view-btn">View</button>
      <button class="update-btn">Update</button>
      <button class="delete-btn">Delete</button>
      <hr>
    `;

    // Attach event listeners (CSP safe)
    div.querySelector(".view-btn").addEventListener("click", () => getNote(note._id));
    div.querySelector(".update-btn").addEventListener("click", () => updateNote(note._id));
    div.querySelector(".delete-btn").addEventListener("click", () => deleteNote(note._id));


    list.appendChild(div);
  });
}


// Get note by ID
async function getNote(id) {
  const res = await fetch(`${API}/note/${id}`, {
    headers: { "Authorization": "Bearer " + token }
  });
  
  const note = await res.json();

  if (res.ok) {
    alert(`Title: ${note.title}\nContent: ${note.content}\nTags: ${note.tags.join(", ")}`);
  } else {
    alert(note.message || "Failed to fetch note");
  }
}

// Update note
async function updateNote(id) {
  const newTitle = prompt("New title:");
  const newContent = prompt("New content:");
  const newTags = prompt("New tags (comma separated):");

  if (newTitle === null && newContent === null && newTags === null) return;

  const res = await fetch(`${API}/note/${id}`, {
    method: "PUT",
     headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      title: newTitle,
      content: newContent,
      tags: newTags
        ? newTags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    })
  });

  const data = await res.json();

  if (res.ok) {
    loadNotes();
  } else {
    alert(data.message || "Failed to update note");
  }
}



// Delete note
async function deleteNote(id) {
  if (!confirm("Are you sure you want to delete this note?")) return;
  
  const res = await fetch(`${API}/note/${id}`, {
    method: "DELETE",
    headers: { "Authorization": "Bearer " + token }
  });

  const data = await res.json();

  if (res.ok) {
    alert(data.message);
    loadNotes();
  } else {
    alert(data.message || "Failed to delete note");
  }
}

// Load notes on page load
loadNotes();
  