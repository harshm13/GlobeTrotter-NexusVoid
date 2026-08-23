document.addEventListener("DOMContentLoaded", async () => {
  checkAuth();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }

  const mockProfileData = {
    name: "Harsh M",
    email: "harshm13@example.com",
    phone: "+1 234 567 890",
    bio: "Explorer of the world.",
    currency: "USD",
    language: "EN",
    stats: { tripsPlanned: 3, travelDays: 27, locationsExplored: 8 },
  };

  const statTrips = document.getElementById("stat-trips-planned");
  const statDays = document.getElementById("stat-travel-days");
  const statLocs = document.getElementById("stat-locations");

  if (statTrips) statTrips.textContent = mockProfileData.stats.tripsPlanned;
  if (statDays) statDays.textContent = mockProfileData.stats.travelDays;
  if (statLocs) statLocs.textContent = mockProfileData.stats.locationsExplored;

  const forms = document.querySelectorAll("form");
  forms.forEach((f) => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Profile updated successfully!");
    });
  });
});
