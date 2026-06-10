const NAV_LINKS = [
  { href: "./index.html", label: "Home" },
  { href: "./explore.html", label: "Explorer" },
  { href: "./Budget.html", label: "Budget" },
  { href: "./TripGen.html", label: "Generator" },
  { href: "./Mood.html", label: "Travel Mood" },
  { href: "./Support.html", label: "Feedback" }
];

function getCurrentPage() {
  const currentPage = window.location.pathname.split("/").pop().toLowerCase();
  return currentPage || "index.html";
}

function renderNav() {
  const currentPage = getCurrentPage();
  const navList = NAV_LINKS.map((link) => {
    const linkPage = link.href.split("/").pop().toLowerCase();
    const activeClass = linkPage === currentPage ? "active" : "";
    return `<li><a href="${link.href}" class="${activeClass}">${link.label}</a></li>`;
  }).join("");

  return `
  <nav>
    <h2>TravelNest</h2>
    <div class="hamburger" id="hamburger">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <ul id="nav-links">${navList}</ul>
  </nav>`;
}

const destinations = [
  {
    name: "Indonesia",
    region: "asia",
    description: "Beaches, temples, and tropical vibes.",
    image: "./Compresed_images/Indonesia.jpg",
    country: "Indonesia",
    attractions: ["Ubud Monkey Forest", "Tanah Lot Temple", "Tegallalang Rice Terraces", "Mount Batur", "Seminyak Beach"],
    costs: [
      { item: "Stay (per night)", low: "$15", mid: "$70", high: "$300+" },
      { item: "Dinner for 2", low: "$10", mid: "$35", high: "$120+" },
      { item: "Activities (per day)", low: "$10", mid: "$30", high: "$100+" }]
  },
  {
    name: "Japan",
    region: "asia",
    description: "Modern tech city with tradition.",
    image: "./Compresed_images/Japan.jpg",
    country: "Japan",
    attractions: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Skytree", "Akihabara", "Meiji Shrine"],
    costs: [
      { item: "Stay (per night)", low: "$50", mid: "$150", high: "$500+" },
      { item: "Dinner for 2", low: "$25", mid: "$80", high: "$200+" },
      { item: "Activities (per day)", low: "$20", mid: "$60", high: "$150+" }]

  },
  {
    name: "France",
    region: "europe",
    description: "City of love and lights.",
    image: "./Compresed_images/France.jpg",
    country: "France",
    attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Montmartre", "Seine River Cruise"],
    costs: [
      { item: "Stay (per night)", low: "$65", mid: "$195", high: "$540+" },
      { item: "Dinner for 2", low: "$32", mid: "$97", high: "$270+" },
      { item: "Activities (per day)", low: "$22", mid: "$75", high: "$195+" }
    ]
  },
  {
    name: "Thailand",
    region: "asia",
    description: "Tropical island paradise with palm-fringed beaches and clear waters.",
    image: "./Compresed_images/Thailand.jpg",
    country: "Thailand",
    attractions: ["Big Buddha Temple", "Chaweng Beach", "Ang Thong Marine Park", "Na Muang Waterfalls", "Fisherman’s Village"],
    costs: [
      { item: "Stay (per night)", low: "$20", mid: "$80", high: "$350+" },
      { item: "Dinner for 2", low: "$12", mid: "$40", high: "$150+" },
      { item: "Activities (per day)", low: "$15", mid: "$40", high: "$120+" }
    ]
  },
  {
    name: "Switzerland",
    region: "europe",
    description: "Alpine lakes, historic bridges, and charming mountain scenery.",
    image: "./Compresed_images/Switzerland.jpg",
    country: "Switzerland",
    attractions: ["Chapel Bridge", "Lake Lucerne", "Mount Pilatus", "Old Town", "Lion Monument"],
    costs: [
      { item: "Stay (per night)", low: "$90", mid: "$220", high: "$660+" },
      { item: "Dinner for 2", low: "$44", mid: "$110", high: "$275+" },
      { item: "Activities (per day)", low: "$33", mid: "$88", high: "$220+" }
    ]
  },
  {
    name: "Italy",
    region: "europe",
    description: "Romantic canals, historic bridges, and timeless Venetian charm.",
    image: "./Compresed_images/Italy.jpg",
    country: "Italy",
    attractions: ["St. Mark's Square", "Grand Canal", "Rialto Bridge", "Doge's Palace", "Murano Glass Factories"],
    costs: [
      { item: "Stay (per night)", low: "$87", mid: "$216", high: "$650+" },
      { item: "Dinner for 2", low: "$43", mid: "$108", high: "$270+" },
      { item: "Activities (per day)", low: "$32", mid: "$86", high: "$216+" }
    ]
  },
  {
    name: "USA",
    region: "america",
    description: "The city that never sleeps.",
    image: "./Compresed_images/USA.jpg",
    country: "USA",
    attractions: ["Times Square", "Central Park", "Statue of Liberty", "Brooklyn Bridge", "Empire State Building"],
    costs: [
      { item: "Stay (per night)", low: "$80", mid: "$250", high: "$700+" },
      { item: "Dinner for 2", low: "$40", mid: "$120", high: "$300+" },
      { item: "Activities (per day)", low: "$30", mid: "$90", high: "$250+" }
    ]
  },
  {
    name: "Brazil",
    region: "america",
    description: "Beaches and vibrant culture.",
    image: "./Compresed_images/Brazil.jpg",
    country: "Brazil",
    attractions: ["Christ the Redeemer", "Copacabana Beach", "Sugarloaf Mountain", "Ipanema Beach", "Maracanã Stadium"],
    costs: [
      { item: "Stay (per night)", low: "$25", mid: "$90", high: "$300+" },
      { item: "Dinner for 2", low: "$20", mid: "$50", high: "$150+" },
      { item: "Activities (per day)", low: "$15", mid: "$50", high: "$120+" }
    ]
  },
  {
    name: "Sri Lanka",
    region: "asia",
    description: "Emerald tea hills, golden beaches, and wildlife adventures.",
    image: "./Compresed_images/Sri Lanka.jpg",
    country: "Sri Lanka",
    attractions: ["Coconut Tree Hill", "Whale Watching Tours", "Secret Beach", "Parrot Rock", "Mirissa Beach"],
    costs: [
      { item: "Stay (per night)", low: "$10", mid: "$50", high: "$200+" },
      { item: "Dinner for 2", low: "$8", mid: "$25", high: "$80+" },
      { item: "Activities (per day)", low: "$10", mid: "$30", high: "$100+" }
    ]
  },
  {
    name: "New Zealand",
    region: "oceania",
    description: "Adventure capital with lakes, mountains, and scenic fjords.",
    image: "./Compresed_images/New Zealand.jpg",
    country: "New Zealand",
    attractions: ["Milford Sound", "Queenstown", "Rotorua Geothermal Parks", "Tongariro Alpine Crossing", "Franz Josef Glacier"],
    costs: [
      { item: "Stay (per night)", low: "$18", mid: "$90", high: "$240+" },
      { item: "Dinner for 2", low: "$15", mid: "$42", high: "$120+" },
      { item: "Activities (per day)", low: "$12", mid: "$48", high: "$150+" }
    ]
  }
];

/* Which explorer destinations match each mood or trip type */
const MOOD_TAGS = {
  relaxed: ["Indonesia", "Thailand", "Sri Lanka"],
  excited: ["Japan", "USA", "Brazil"],
  romantic: ["France", "Italy", "Switzerland"],
  adventurous: ["New Zealand", "Switzerland", "Sri Lanka"]
};

const TRIP_TAGS = {
  beach: ["Indonesia", "Thailand", "Brazil", "Sri Lanka"],
  adventure: ["New Zealand", "Sri Lanka", "Switzerland"],
  city: ["Japan", "France", "Italy", "USA"],
  nature: ["Switzerland", "Indonesia"]
};

function getDestinationsByMood(mood) {
  const names = MOOD_TAGS[mood] ?? [];
  return destinations.filter((d) => names.includes(d.name));
}

function getDestinationsByTripType(type) {
  const names = TRIP_TAGS[type] ?? [];
  return destinations.filter((d) => names.includes(d.name));
}

function pickRandom(list) {
  if (!list.length) return null;
  return list[Math.floor(Math.random() * list.length)];
}



function renderFooter() {
  const footerLinks = NAV_LINKS.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join("");
  return `
  <footer>
    <div class="footer-grid">
      <div class="footer-col footer-brand">
        <a href="./index.html" class="nav-logo">Travel<span>Nest</span></a>
        <p>Discover new destinations, plan smarter journeys, and explore the world with TravelNest.</p>
      </div>
      <div class="footer-col footer-links">
        <h4>Explore</h4>
        <ul>${footerLinks}</ul>
      </div>
      <div class="footer-col footer-newsletter">
        <h4>Stay Updated</h4>
        <p class="footer-note">Get travel tips, deals, and inspiration weekly.</p>
        <form class="newsletter-form" data-newsletter novalidate>
          <input type="email" placeholder="Enter your email" required>
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} TravelNest. Explore more, worry less 🌍</p>
    </div>
  </footer>
  <div id="toast"></div>`;
}

/* Utilities */
const $ = (id) => document.getElementById(id);

function getJSON(key, fallback = {}) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showToast(message) {
  const toast = $("toast");
  if (!toast) {
    alert(message);
    return;
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function bindNewsletter() {
  document.querySelectorAll("[data-newsletter]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type=email]");
      const email = input?.value.trim() ?? "";
      if (!email) {
        showToast("Please enter your email.");
        return;
      }
      localStorage.setItem("newsletterEmail", email);
      showToast("Subscribed successfully!");
      if (input) input.value = "";
    });
  });
}

function showResult({ titleEl, textEl, imageEl, data }) {
  if (titleEl) titleEl.textContent = data.name;
  if (textEl) textEl.textContent = data.text ?? data.description ?? "";
  if (imageEl) {
    imageEl.src = data.image;
    imageEl.alt = data.name;
    imageEl.style.display = "block";
  }
}

/* Layout */
function initLayout() {
  const navSlot = document.getElementById("nav-placeholder");
  const footerSlot = document.getElementById("footer-placeholder");

  if (navSlot) navSlot.innerHTML = renderNav();
  if (footerSlot) footerSlot.innerHTML = renderFooter();

  initNavbar();
  bindNewsletter();
}

function initNavbar() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
}