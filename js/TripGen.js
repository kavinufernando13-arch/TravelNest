initLayout();

let currentTrip = null;

function pickTrip() {
  const type = $("tripType").value;
  if (!type) {
    showToast("Please select a trip type.");
    return;
  }

  const options = getDestinationsByTripType(type);
  currentTrip = pickRandom(options);

  if (!currentTrip) {
    showToast("No destinations found for this trip type.");
    return;
  }

  showResult({
    titleEl: $("tripName"),
    textEl: $("tripText"),
    imageEl: $("tripImage"),
    data: currentTrip
  });

  $("actionButtons").classList.add("is-visible");
}

function saveToWishlist() {
  if (!currentTrip) return;

  const wishlist = getJSON("travelWishlist", []);
  if (wishlist.some((trip) => trip.name === currentTrip.name)) {
    showToast(`${currentTrip.name} is already in your wishlist.`);
    return;
  }

  wishlist.push(currentTrip);
  setJSON("travelWishlist", wishlist);
  showToast(`${currentTrip.name} added to your wishlist!`);
}

$("tripForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  pickTrip();
});
$("surpriseBtn")?.addEventListener("click", pickTrip);
$("wishlistBtn")?.addEventListener("click", saveToWishlist);
