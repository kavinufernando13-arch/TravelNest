initLayout();

const quotes = [
  "Travel is the only thing you buy that makes you richer.",
  "Adventure awaits.",
  "Collect moments not things."
];

let quoteIndex = 0;
setInterval(() => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  const quoteEl = $("quote");
  if (quoteEl) quoteEl.textContent = quotes[quoteIndex];
}, 3000);

const today = destinations[new Date().getDate() % destinations.length];
$("destination-name").textContent = today.name;
$("destination-text").textContent = today.description;
$("destination-image").src = today.image;
