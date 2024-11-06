// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBos1PH4bWLNUD4YdFuxaVrMCVaafqwE5I",
  authDomain: "life-for-one.firebaseapp.com",
  databaseURL: "https://life-for-one-default-rtdb.firebaseio.com",
  projectId: "life-for-one",
  storageBucket: "life-for-one.firebasestorage.app",
  messagingSenderId: "614680961000",
  appId: "1:614680961000:web:a47b4e1fc7767c38040e5d",
  measurementId: "G-THG52ED87H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const leaderboardRef = ref(database, 'leaderboard');

// Display real-time updates to the leaderboard
onChildAdded(leaderboardRef, (snapshot) => {
  const entry = snapshot.val();
  const leaderboard = document.querySelector('.leaderboard-section');
  const entryDiv = document.createElement('div');
  entryDiv.textContent = `NAME: ${entry.name}, LOCATION: ${entry.location}, INSTAGRAM: ${entry.instagram}`;
  leaderboard.appendChild(entryDiv);
});

// Handle form submission
document.getElementById('user-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value;
  const instagram = document.getElementById('instagram').value;
  const story = document.getElementById('story').value;

  push(leaderboardRef, { name, location, instagram, story });

  alert('Data submitted successfully!');
  document.getElementById('user-form').reset();

  // Hide form and show leaderboard with "Back" button
  document.getElementById('form-section').style.display = 'none';
  document.getElementById('back-to-leaderboard').style.display = 'block';
});

// Handle navigation back to the leaderboard
document.getElementById('back-to-leaderboard').addEventListener('click', () => {
  document.getElementById('form-section').style.display = 'none';
  document.getElementById('main-interface').style.display = 'block';
});

// Show form when "The One Who Made Suffered" button is clicked
document.getElementById('open-form').addEventListener('click', () => {
  document.getElementById('main-interface').style.display = 'none';
  document.getElementById('form-section').style.display = 'block';
});
