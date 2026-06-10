const TRACKED_KEY = "trackedDestinations";
const SOUNDS = ["rain", "forest", "city"];

let currentDestination = null;
let currentSound = null;

function getTracked() {
  return getJSON(TRACKED_KEY, {});
}

function setStatus(message) {
  const el = $("destinationStatus");
  if (el) el.textContent = message ?? "";
}

function setSoundStatus(message) {
  const el = $("soundStatus");
  if (el) el.textContent = message ?? "";
}

function updateStatus(message) {
  if (message) {
    setStatus(message);
    return;
  }
  if (!currentDestination) {
    setStatus("");
    return;
  }
  const status = getTracked()[currentDestination];
  if (status === "visited") setStatus("You have visited this place!");
  else if (status === "planned") setStatus("On your planned trips list.");
  else setStatus("");
}

function highlightButtons() {
  const status = currentDestination ? getTracked()[currentDestination] : null;
  $("markVisitedBtn")?.classList.toggle("is-active", status === "visited");
  $("markPlannedBtn")?.classList.toggle("is-active", status === "planned");
}

function findDestination() {
  const mood = $("moodSelect").value;
  if (!mood) {
    setStatus("Please select your mood first.");
    return;
  }

  const options = getDestinationsByMood(mood);
  const dest = pickRandom(options);

  if (!dest) {
    setStatus("No destinations found for this mood.");
    return;
  }

  currentDestination = dest.name;

  showResult({
    titleEl: $("moodDestination"),
    textEl: $("moodText"),
    imageEl: $("moodImage"),
    data: dest
  });

  $("actionButtons").classList.add("is-visible");
  $("surpriseMeBtn")?.classList.add("is-visible");
  updateStatus();
  highlightButtons();
}

function markDestination(status) {
  if (!currentDestination) return;

  const tracked = getTracked();
  tracked[currentDestination] = status;
  setJSON(TRACKED_KEY, tracked);

  renderTrackedLists();
  highlightButtons();

  const msg =
    status === "visited"
      ? `${currentDestination} marked as visited!`
      : `${currentDestination} added to planned trips!`;
  updateStatus(msg);
}

function removeTracked(name) {
  const tracked = getTracked();
  delete tracked[name];
  setJSON(TRACKED_KEY, tracked);
  renderTrackedLists();
  if (currentDestination === name) {
    updateStatus();
    highlightButtons();
  }
}

function listItem(name) {
  return `<li><span>${name}</span><button type="button" class="tracked-remove" data-remove="${name}" aria-label="Remove ${name}">×</button></li>`;
}

function renderTrackedLists() {
  const tracked = getTracked();
  const visited = Object.keys(tracked).filter((n) => tracked[n] === "visited");
  const planned = Object.keys(tracked).filter((n) => tracked[n] === "planned");

  $("visitedList").innerHTML = visited.length
    ? visited.map(listItem).join("")
    : '<li class="tracked-empty">None yet — mark a match as visited.</li>';

  $("plannedList").innerHTML = planned.length
    ? planned.map(listItem).join("")
    : '<li class="tracked-empty">None yet — mark a match as planned.</li>';
}

function setSoundActive(type) {
  SOUNDS.forEach((id) => {
    const btn = $(`btn-${id}`);
    const active = type !== null && id === type;
    btn?.classList.toggle("active", active);
    btn?.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function stopAllSounds() {
  SOUNDS.forEach((id) => {
    const audio = $(`audio-${id}`);
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  });
}

async function playSound(type) {
  const audio = $(`audio-${type}`);
  if (!audio) return false;

  stopAllSounds();
  audio.currentTime = 0;

  try {
    await audio.play();
    return true;
  } catch {
    /* Wait for file to load, then try once more */
    return new Promise((resolve) => {
      const onReady = async () => {
        audio.removeEventListener("canplaythrough", onReady);
        audio.removeEventListener("error", onError);
        try {
          await audio.play();
          resolve(true);
        } catch {
          resolve(false);
        }
      };
      const onError = () => {
        audio.removeEventListener("canplaythrough", onReady);
        audio.removeEventListener("error", onError);
        resolve(false);
      };
      audio.addEventListener("canplaythrough", onReady, { once: true });
      audio.addEventListener("error", onError, { once: true });
      audio.load();
    });
  }
}

async function toggleSound(type) {
  if (!type || !SOUNDS.includes(type)) return;

  setSoundStatus("");

  if (currentSound === type) {
    stopAllSounds();
    currentSound = null;
    setSoundActive(null);
    return;
  }

  const played = await playSound(type);

  if (played) {
    currentSound = type;
    setSoundActive(type);
  } else {
    setSoundStatus("Could not play this sound. Check your connection and try again.");
    currentSound = null;
    setSoundActive(null);
  }
}

function onListClick(e) {
  const btn = e.target.closest("[data-remove]");
  if (btn) removeTracked(btn.dataset.remove);
}

function initMoodPage() {
  initLayout();

  $("findDestinationBtn")?.addEventListener("click", findDestination);
  $("markVisitedBtn")?.addEventListener("click", () => markDestination("visited"));
  $("markPlannedBtn")?.addEventListener("click", () => markDestination("planned"));
  $("surpriseMeBtn")?.addEventListener("click", findDestination);

  document.querySelector(".sound-controls")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-sound");
    if (!btn?.dataset.sound) return;
    toggleSound(btn.dataset.sound);
  });

  $("visitedList")?.addEventListener("click", onListClick);
  $("plannedList")?.addEventListener("click", onListClick);

  SOUNDS.forEach((id) => {
    const audio = $(`audio-${id}`);
    if (audio) audio.volume = 0.7;
  });

  renderTrackedLists();
}

document.addEventListener("DOMContentLoaded", initMoodPage);
