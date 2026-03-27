
// Dinamik API URL Belirleme
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001'
  : 'https://vitamin-app.onrender.com';

// Örnek Fetch Fonksiyonu
async function getVitaminRecommend(query) {
    try {
        const response = await fetch(`${API_URL}/recommend?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        console.log("Gelen Veri:", data);
        return data;
    } catch (error) {
        console.error("Backend'e bağlanırken hata oluştu:", error);
    }
}

/**

* script.js — VitaSearch Frontend Logic
 *
 * Responsibilities:
 *  1. Listen for search events (button click, Enter key, chip click)
 *  2. Fetch data from the NestJS backend API
 *  3. Render results as vitamin cards
 *  4. Handle loading, error, and empty states
 */

// ─────────────────────────────────────────────
// CONFIGURATION
// Change this URL if your backend runs on a different port or host.
// ─────────────────────────────────────────────
const API_BASE_URL = 'http://localhost:3001';

// Örnek kullanım: fetch(`${API_URL}/recommend`)
// Eğer tarayıcıda localhost açıldıysa 3001'e git, yoksa Render'a git:


// Artık fetch yaparken sadece API_URL kullanman yeterli

// ─────────────────────────────────────────────
// DOM ELEMENT REFERENCES
// We grab all the elements we need once on load.
// ─────────────────────────────────────────────
const searchInput    = document.getElementById('searchInput');
const searchBtn      = document.getElementById('searchBtn');
const loadingState   = document.getElementById('loadingState');
const errorState     = document.getElementById('errorState');
const errorMessage   = document.getElementById('errorMessage');
const emptyState     = document.getElementById('emptyState');
const resultsSection = document.getElementById('resultsSection');
const resultQuery    = document.getElementById('resultQuery');
const resultCount    = document.getElementById('resultCount');
const resultsGrid    = document.getElementById('resultsGrid');
const chips          = document.querySelectorAll('.chip');

// ─────────────────────────────────────────────
// EVENT LISTENERS
// ─────────────────────────────────────────────

// Button click → trigger search
searchBtn.addEventListener('click', handleSearch);

// Enter key inside input → trigger search
searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// Suggestion chip clicks → fill input and search
chips.forEach(function (chip) {
  chip.addEventListener('click', function () {
    const query = chip.getAttribute('data-query');
    searchInput.value = query;
    handleSearch();
  });
});

// ─────────────────────────────────────────────
// MAIN SEARCH HANDLER
// ─────────────────────────────────────────────
async function handleSearch() {
  const query = searchInput.value.trim();

  // Don't search if the input is empty
  if (!query) {
    searchInput.focus();
    searchInput.classList.add('shake'); // brief CSS shake animation feedback
    setTimeout(() => searchInput.classList.remove('shake'), 400);
    return;
  }

  // Show loading state, hide everything else
  showState('loading');
  searchBtn.disabled = true;

  try {
    // Build the API URL: GET /recommend?q=<query>
    const url = `${API_BASE_URL}/recommend?q=${encodeURIComponent(query)}`;

    // Fetch from the NestJS backend
    const response = await fetch(url);

    // If the server returned an error status (4xx, 5xx)
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const msg = errorData?.message || `Server error (${response.status})`;
      throw new Error(msg);
    }

    // Parse JSON response
    const data = await response.json();

    // Render the results
    renderResults(data);

  } catch (error) {
    // Network failures or server errors land here
    if (error.message === 'Failed to fetch') {
      showState('error', 'Cannot connect to the backend. Make sure the NestJS server is running on port 3001.');
    } else {
      showState('error', error.message || 'An unexpected error occurred.');
    }
  } finally {
    // Re-enable the button regardless of success or failure
    searchBtn.disabled = false;
  }
}

// ─────────────────────────────────────────────
// RENDER RESULTS
// Receives the API response and builds the card UI.
// ─────────────────────────────────────────────
function renderResults(data) {
  // If no vitamins matched, show the empty state
  if (!data.vitamins || data.vitamins.length === 0) {
    showState('empty');
    return;
  }

  // Update result header text
  resultQuery.textContent = `"${data.input}"`;
  const count = data.vitamins.length;
  resultCount.textContent = `${count} vitamin${count !== 1 ? 's' : ''} found`;

  // Clear any old cards
  resultsGrid.innerHTML = '';

  // Build a card for each vitamin
  data.vitamins.forEach(function (vitamin) {
    const card = createVitaminCard(vitamin);
    resultsGrid.appendChild(card);
  });

  // Show the results section
  showState('results');

  // Smoothly scroll to results
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─────────────────────────────────────────────
// CREATE VITAMIN CARD ELEMENT
// Returns a DOM element for a single vitamin.
// ─────────────────────────────────────────────
function createVitaminCard(vitamin) {
  // Create the outer card div
  const card = document.createElement('article');
  card.className = 'vitamin-card';
  card.setAttribute('aria-label', vitamin.name);

  // Build the foods list (small pill tags)
  const foodsHTML = vitamin.foods
    .map(function (food) {
      // Capitalise first letter for display
      const label = food.charAt(0).toUpperCase() + food.slice(1);
      return `<li class="food-tag">${escapeHTML(label)}</li>`;
    })
    .join('');

  // Inject card HTML
  card.innerHTML = `
    <!-- Card Header -->
    <div class="card-header">
      <h3 class="card-vitamin-name">${escapeHTML(vitamin.name)}</h3>
      <span class="card-badge">Vitamin</span>
    </div>

    <!-- Benefits -->
    <div class="card-section">
      <p class="card-section-label">Benefits</p>
      <p class="card-section-text">${escapeHTML(vitamin.benefits)}</p>
    </div>

    <!-- Rich Foods -->
    <div class="card-section">
      <p class="card-section-label">Rich in foods</p>
      <ul class="foods-list">
        ${foodsHTML}
      </ul>
    </div>

    <!-- Deficiency -->
    <div class="card-section">
      <p class="card-section-label">Deficiency causes</p>
      <p class="deficiency-text">${escapeHTML(vitamin.deficiency)}</p>
    </div>
  `;

  return card;
}

// ─────────────────────────────────────────────
// STATE MANAGER
// Controls which section/message is visible.
// States: 'loading' | 'error' | 'empty' | 'results'
// ─────────────────────────────────────────────
function showState(state, message) {
  // Hide all dynamic sections first
  loadingState.hidden   = true;
  errorState.hidden     = true;
  emptyState.hidden     = true;
  resultsSection.hidden = true;

  if (state === 'loading') {
    loadingState.hidden = false;

  } else if (state === 'error') {
    errorMessage.textContent = message || 'Something went wrong.';
    errorState.hidden = false;

  } else if (state === 'empty') {
    emptyState.hidden = false;

  } else if (state === 'results') {
    resultsSection.hidden = false;
  }
}

// ─────────────────────────────────────────────
// UTILITY: Escape HTML
// Prevents XSS by escaping special characters before
// inserting any API-returned text into the DOM.
// ─────────────────────────────────────────────
function escapeHTML(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return String(str).replace(/[&<>"']/g, function (char) {
    return map[char];
  });
}

// ─────────────────────────────────────────────
// SHAKE ANIMATION (inline style, no extra CSS needed)
// ─────────────────────────────────────────────
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25%       { transform: translateX(-6px); }
    75%       { transform: translateX(6px); }
  }
  .shake { animation: shake 0.35s ease; }
`;
document.head.appendChild(shakeStyle);
