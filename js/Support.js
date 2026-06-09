initLayout();

document.getElementById("feedbackForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: $("name").value.trim(),
    email: $("email").value.trim(),
    rating: $("rating").value,
    message: $("message").value.trim()
  };

  if (!data.name || !data.email || !data.rating || !data.message) {
    showToast("Please fill all fields.");
    return;
  }

  setJSON("travelnestFeedback", data);
  // show app toast (matches TripGen wishlist toast)
  showToast("Feedback submitted successfully!");
  e.target.reset();
});
