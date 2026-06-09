initLayout();

// Populate destination dropdown
function populateDestinations() {
  const destinationSelect = $("destination");
  destinations.forEach(dest => {
    const option = document.createElement("option");
    option.value = dest.country;
    option.textContent = `${dest.name} (${dest.region})`;
    destinationSelect.appendChild(option);
  });
}

// Calculate budget status based on daily budget
function getBudgetStatus(dailyBudget) {
  if (dailyBudget < 100) return { status: "Budget", class: "status-low", range: 25 };
  if (dailyBudget < 250) return { status: "Moderate", class: "status-moderate", range: 50 };
  return { status: "Luxury", class: "status-luxury", range: 100 };
}

// Animated counter effect
function animateCounter(element, finalValue, duration = 300) {
  const startValue = 0;
  const startTime = Date.now();
  
  function updateCounter() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(startValue + (finalValue - startValue) * progress);
    element.textContent = `$${currentValue.toLocaleString()}`;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = `$${finalValue.toLocaleString()}`;
    }
  }
  
  updateCounter();
}

// (Progress bar function removed - no longer needed)


// Save trip to localStorage
function saveTrip(destination, days, dailyBudget, totalCost, status) {
  const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
  const trip = {
    id: Date.now(),
    destination,
    days,
    dailyBudget,
    totalCost,
    status,
    date: new Date().toLocaleDateString()
  };
  
  savedTrips.push(trip);
  localStorage.setItem("trips", JSON.stringify(savedTrips));
  showToast("Trip saved successfully!");
  loadSavedTrips();
}

// Load and display saved trips
function loadSavedTrips() {
  const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
  const tripsList = $("savedTripsList");
  const clearAllBtn = $("clearAllBtn");
  
  if (savedTrips.length === 0) {
    tripsList.innerHTML = '<p class="empty-message">No saved trips yet. Calculate and save one!</p>';
    clearAllBtn.style.display = "none";
    return;
  }
  
  clearAllBtn.style.display = "block";
  
  tripsList.innerHTML = savedTrips.map(trip => {
    const status = getBudgetStatus(trip.dailyBudget);
    return `
      <div class="trip-card">
        <div class="trip-info">
          <h4>${trip.destination}</h4>
          <p class="trip-details">${trip.days} days • $${trip.dailyBudget}/day</p>
          <p class="trip-date">${trip.date}</p>
        </div>
        <div class="trip-cost">
          <p class="cost-amount">$${trip.totalCost.toLocaleString()}</p>
          <p class="cost-status ${status.class}">${trip.status}</p>
        </div>
        <button class="btn btn-icon" onclick="deleteTrip(${trip.id})" title="Delete trip">✕</button>
      </div>
    `;
  }).join("");
}

// Clear all trips from localStorage
function clearAllTrips() {
  if (confirm("Are you sure you want to delete all saved trips? This action cannot be undone.")) {
    localStorage.removeItem("trips");
    loadSavedTrips();
    showToast("All trips cleared!");
  }
}

// Delete trip from localStorage
function deleteTrip(id) {
  let savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
  savedTrips = savedTrips.filter(trip => trip.id !== id);
  localStorage.setItem("trips", JSON.stringify(savedTrips));
  loadSavedTrips();
  showToast("Trip removed!");
}

// Form submission
document.getElementById("budgetForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const destination = $("destination").value;
  const days = parseFloat($("days").value);
  const dailyBudget = parseFloat($("dailyBudget").value);

  if (!destination || Number.isNaN(days) || Number.isNaN(dailyBudget)) {
    showToast("Please fill all fields correctly.");
    return;
  }

  const totalCost = days * dailyBudget;
  const budgetInfo = getBudgetStatus(dailyBudget);
  
  // Show result container
  $("resultContainer").style.display = "block";
  
  // Update budget category
  $("budgetCategory").textContent = budgetInfo.status;
  $("budgetStatus").textContent = budgetInfo.status;
  $("budgetStatus").className = `budget-status ${budgetInfo.class}`;
  
  // Animate counter
  animateCounter($("totalCost"), totalCost);
  
  // Store current trip data for save button
  window.currentTrip = { destination, days, dailyBudget, totalCost, status: budgetInfo.status };
});

// Save trip button
$("saveTripBtn")?.addEventListener("click", () => {
  if (window.currentTrip) {
    saveTrip(window.currentTrip.destination, window.currentTrip.days, 
             window.currentTrip.dailyBudget, window.currentTrip.totalCost, 
             window.currentTrip.status);
  }
});

// Clear all trips button
$("clearAllBtn")?.addEventListener("click", clearAllTrips);

// Load saved trips on page load
loadSavedTrips();
populateDestinations();
