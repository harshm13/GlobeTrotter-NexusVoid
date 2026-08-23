// frontend/js/dashboard.js

document.addEventListener("DOMContentLoaded", async () => {
  checkAuth();

  // Bind logout button
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }

  try {
    const upcomingContainer = document.getElementById("upcoming-trips");
    const pastContainer = document.getElementById("past-trips");

    if (!upcomingContainer || !pastContainer) return;

    // Fetch all trips using the global helper (token is sent automatically)
    const trips = await apiFetch("/trips/");

    const today = new Date().toISOString().split("T")[0];
    const upcomingTrips = trips.filter(
      (t) => !t.start_date || t.start_date >= today,
    );
    const pastTrips = trips.filter((t) => t.start_date && t.start_date < today);

    if (upcomingTrips.length === 0) {
      upcomingContainer.innerHTML =
        '<p style="color: #111827; grid-column: span 3; font-weight: 600;">No upcoming trips found.</p>';
    } else {
      upcomingContainer.innerHTML = upcomingTrips
        .map((trip) => createTripCard(trip, "upcoming"))
        .join("");
    }

    if (pastTrips.length === 0) {
      pastContainer.innerHTML =
        '<p style="color: #111827; grid-column: span 3; font-weight: 600;">No past trips found.</p>';
    } else {
      pastContainer.innerHTML = pastTrips
        .map((trip) => createTripCard(trip, "past"))
        .join("");
    }
  } catch (error) {
    console.error("Error fetching trips:", error.message);
    const upcomingContainer = document.getElementById("upcoming-trips");
    if (upcomingContainer) {
      upcomingContainer.innerHTML = `<p style="color: #e11d48; grid-column: span 3; font-weight: 600;">Failed to load trips: ${error.message}</p>`;
    }
  }
});
