document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tripId = urlParams.get("trip_id");
  const alertBox = document.getElementById("public-alert");
  const content = document.getElementById("itinerary-content");

  if (!tripId) {
    if (alertBox) {
      alertBox.textContent = "Invalid Trip Link";
      alertBox.className = "alert alert-error";
      alertBox.style.display = "block";
    }
    return;
  }

  try {
    // We use raw fetch here because this is a public page (no auth token required)
    const response = await fetch(
      `https://globetrotter-nexusvoid.onrender.com/api/trips/public/${tripId}`,
    );
    if (!response.ok) {
      throw new Error("Trip not found or not public");
    }

    const data = await response.json();
    const trip = data.trip;
    const stops = data.stops;

    document.getElementById("trip-title").textContent = trip.title;
    document.getElementById("trip-dates").textContent =
      `${trip.start_date} to ${trip.end_date}`;

    if (trip.description)
      document.getElementById("trip-desc").textContent = trip.description;
    if (trip.cover_photo_url) {
      document.getElementById("hero-section").style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${trip.cover_photo_url}')`;
      document.getElementById("hero-section").style.backgroundSize = "cover";
      document.getElementById("hero-section").style.backgroundPosition =
        "center";
    }

    const timeline = document.getElementById("timeline");
    if (stops.length === 0) {
      timeline.innerHTML = `<p class="text-center text-secondary">No stops have been planned for this trip yet.</p>`;
    } else {
      stops.forEach((stopData) => {
        const stop = stopData.stop;
        const activities = stopData.activities;

        const block = document.createElement("div");
        block.className = "stop-block";

        let actsHtml = activities
          .map(
            (act) => `
                    <div class="activity-item">
                        <div>
                            <span style="font-weight: 600;">${act.name}</span>
                            <span class="text-secondary" style="margin-left: 8px; font-size: 12px;">${act.category}</span>
                        </div>
                    </div>
                `,
          )
          .join("");

        if (activities.length === 0)
          actsHtml = `<p class="text-secondary" style="font-size: 14px;">No activities planned.</p>`;

        block.innerHTML = `
                    <div class="stop-header">
                        <h2>${stop.city_name}</h2>
                        <div class="text-secondary" style="font-size: 14px;">${stop.arrival_date} to ${stop.departure_date}</div>
                    </div>
                    <div>${actsHtml}</div>
                `;
        timeline.appendChild(block);
      });
    }

    content.style.display = "block";
  } catch (e) {
    if (alertBox) {
      alertBox.textContent = e.message;
      alertBox.className = "alert alert-error";
      alertBox.style.display = "block";
    }
  }
});
