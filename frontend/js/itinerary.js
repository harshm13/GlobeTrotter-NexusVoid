// frontend/js/itinerary.js
document.addEventListener("DOMContentLoaded", async () => {
  checkAuth();

  const urlParams = new URLSearchParams(window.location.search);
  const tripIdParam = urlParams.get("trip_id");

  // 1. Enforce Trip ID requirement (redirect if accessed without a valid trip)
  if (!tripIdParam) {
    alert("No trip selected! Please select or create a trip first.");
    window.location.href = "trips.html";
    return;
  }
  const tripId = parseInt(tripIdParam);

  // 2. Wire the Save Itinerary button to show success alert and redirect to trips
  const saveBtn = document.querySelector('header .btn-primary');
  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert(`Success! Itinerary for Trip ID ${tripId} saved and added to your Trips section.`);
      window.location.href = `trips.html`;
    });
  }

  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results-list");
  const timelineContainer = document.getElementById("timeline-container");
  const tripTitle = document.getElementById("trip-title");
  const addStopForm = document.getElementById("add-stop-form");

  let tripStops = [];

  // Mock places for the discovery search panel
  const mockPlaces = [
    { id: 101, name: "Eiffel Tower Summit", type: "Attraction", loc: "Paris, France" },
    { id: 102, name: "Louvre Museum", type: "Attraction", loc: "Paris, France" },
    { id: 103, name: "Le Marais Cafe", type: "Food", loc: "Paris, France" },
    { id: 104, name: "Le Meurice", type: "Hotel", loc: "Paris, France" },
  ];

  // Load itinerary stops from the backend
  async function loadItinerary() {
    try {
      const stops = await apiFetch(`/stops/${tripId}`);
      if (Array.isArray(stops) && stops.length > 0) {
        tripStops = stops.map((s) => ({
          id: s.id,
          title: s.city_name,
          date: s.date,
          activities: [],
        }));
      } else {
        tripStops = [];
      }
    } catch (e) {
      console.warn("Could not load stops from server:", e.message);
      tripStops = [];
    }
    renderTimeline();
    renderSearch(mockPlaces);
  }

  // Handle adding a new stop
  window.handleAddStop = async (tripId, cityName, date) => {
    try {
      const newStop = await apiFetch("/stops/", {
        method: "POST",
        body: JSON.stringify({
          trip_id: parseInt(tripId),
          city_name: cityName,
          date: date
        })
      });

      console.log("Stop added successfully:", newStop);

      // Add new stop to timeline state
      tripStops.push({
        id: newStop.id || Date.now(),
        title: newStop.city_name,
        date: newStop.date,
        activities: [],
      });

      renderTimeline();
      displayGlobalAlert("Stop added successfully!");
    } catch (error) {
      alert("Failed to add stop: " + error.message);
    }
  };

  // Form submit listener for Add Stop modal
  if (addStopForm) {
    addStopForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("stop-title").value;
      const date = document.getElementById("stop-date").value;

      await handleAddStop(tripId, title, date);

      hideModal("add-stop-modal");
      addStopForm.reset();
    });
  }

  function renderSearch(results) {
    if (!searchResults) return;
    searchResults.innerHTML = "";
    results.forEach((res) => {
      searchResults.innerHTML += `
        <div class="result-card" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', ${res.id})">
            <div class="result-info">
                <h4>${res.name}</h4>
                <p>${res.loc}</p>
            </div>
            <button class="btn-add-circle" onclick="addActivityToFirstStop(${res.id})">+</button>
        </div>
      `;
    });
  }

  function renderTimeline() {
    if (!timelineContainer) return;
    timelineContainer.innerHTML = "";

    if (tripStops.length === 0) {
      timelineContainer.innerHTML = `
        <div class="empty-hint" style="margin-bottom: 20px;">
          No days or stops added yet. Click "+ Add Another Day" below to start planning!
        </div>
      `;
    }

    tripStops.forEach((stop) => {
      const dateStr = stop.date ? new Date(stop.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }) : "Date TBD";

      let activitiesHtml = stop.activities
        .map(
          (act) => `
            <div class="timeline-item">
                <div class="drag-handle">
                    <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                    </svg>
                </div>
                <input type="time" class="time-input" value="${act.time}">
                <div class="item-details">
                    <h4>${act.title}</h4>
                    <p>${act.type}</p>
                </div>
                <button class="btn-remove" onclick="removeActivity(${stop.id}, ${act.id})">
                    <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
          `
        )
        .join("");

      if (stop.activities.length === 0) {
        activitiesHtml = `
            <div class="empty-hint" ondragover="event.preventDefault()" ondrop="handleDrop(event, ${stop.id})">
                Drag and drop activities here to build your day.
            </div>
        `;
      }

      timelineContainer.innerHTML += `
        <div class="day-block">
            <div class="day-header" style="display:flex; justify-content:space-between;">
                <div>
                    <h3 class="day-title">${stop.title}</h3>
                    <span class="day-date">${dateStr}</span>
                </div>
                <button class="btn-remove" onclick="removeStop(${stop.id})" style="align-self: flex-start;">
                    <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
            <div class="drop-zone" ondragover="event.preventDefault()" ondrop="handleDrop(event, ${stop.id})">
                ${activitiesHtml}
            </div>
        </div>
      `;
    });

    timelineContainer.innerHTML += `
      <div style="text-align: center; margin-top: 20px;">
          <button class="btn-outline" style="border-style: dashed; width: 100%; cursor: pointer;" onclick="showModal('add-stop-modal')">+ Add Another Day</button>
      </div>
    `;
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value.toLowerCase();
      const filtered = mockPlaces.filter(
        (p) =>
          p.name.toLowerCase().includes(val) ||
          p.loc.toLowerCase().includes(val)
      );
      renderSearch(filtered);
    });
  }

  window.addActivityToFirstStop = (placeId) => {
    if (tripStops.length > 0) {
      const place = mockPlaces.find((p) => p.id === placeId);
      tripStops[0].activities.push({
        id: Date.now(),
        time: "12:00",
        title: place.name,
        type: place.type,
      });
      renderTimeline();
    } else {
      alert("Please add a day/stop first!");
    }
  };

  window.handleDrop = (event, stopId) => {
    event.preventDefault();
    const placeId = parseInt(event.dataTransfer.getData("text/plain"));
    const place = mockPlaces.find((p) => p.id === placeId);
    if (place) {
      const stop = tripStops.find((s) => s.id === stopId);
      if (stop) {
        stop.activities.push({
          id: Date.now(),
          time: "12:00",
          title: place.name,
          type: place.type,
        });
        renderTimeline();
      }
    }
  };

  window.removeActivity = (stopId, actId) => {
    const stop = tripStops.find((s) => s.id === stopId);
    if (stop) {
      stop.activities = stop.activities.filter((a) => a.id !== actId);
      renderTimeline();
    }
  };

  window.removeStop = (stopId) => {
    tripStops = tripStops.filter((s) => s.id !== stopId);
    renderTimeline();
  };

  loadItinerary();
});