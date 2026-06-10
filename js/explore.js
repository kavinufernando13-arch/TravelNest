initLayout();

const grid = document.getElementById("destinationGrid");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const modal = document.getElementById("destinationModal");

function renderCards(list) {
  grid.innerHTML = list
    .map(
      (dest) => `
    <article class="card clickable" tabindex="0" role="button" data-name="${dest.name}">
      <img src="${dest.image}" alt="${dest.name}">
      <div class="card-content">
        <h3>${dest.name}</h3>
        <p>${dest.description}</p>
      </div>
    </article>`
    )
    .join("");
}

function openModal(dest) {
  document.getElementById("modalName").textContent = dest.country;
  document.getElementById("modalRegion").textContent = dest.region?.toUpperCase() ?? "";
  document.getElementById("modalDescription").textContent = dest.description ?? "";

  const attractions = document.getElementById("modalAttractions");
  const listHtml = (dest.attractions ?? [])
    .map((item) => `<li>${item}</li>`)
    .join("");

  attractions.innerHTML = listHtml || "<li>No attractions available</li>";

  const costs = dest.costs ?? [];
  document.getElementById("modalCosts").innerHTML = costs.length
    ? `<thead><tr><th>Item</th><th>Low</th><th>Mid</th><th>High</th></tr></thead>
       <tbody>${costs.map((c) => `<tr><td>${c.item}</td><td>${c.low}</td><td>${c.mid}</td><td>${c.high}</td></tr>`).join("")}</tbody>`
    : "<tr><td colspan='4'>No cost data available</td></tr>";

  modal.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
}

function filterDestinations() {
  const search = searchInput.value.toLowerCase();
  const region = regionFilter.value;
  const filtered = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(search);
    const matchesRegion = region === "all" || dest.region === region;
    return matchesSearch && matchesRegion;
  });
  renderCards(filtered);
}

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const dest = destinations.find((d) => d.name === card.dataset.name);
  if (dest) openModal(dest);
});

grid.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest(".card");
  if (!card) return;
  e.preventDefault();
  const dest = destinations.find((d) => d.name === card.dataset.name);
  if (dest) openModal(dest);
});

document.querySelector(".modal-close")?.addEventListener("click", () => {
  closeModal();
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

searchInput.addEventListener("input", filterDestinations);
regionFilter.addEventListener("change", filterDestinations);
renderCards(destinations);
