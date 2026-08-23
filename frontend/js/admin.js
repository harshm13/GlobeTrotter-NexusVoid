document.addEventListener("DOMContentLoaded", async () => {
  checkAuth();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }

  try {
    // const data = await apiFetch('/admin/stats');
    const data = {
      total_users: 1248,
      total_trips: 8432,
      recent_users: [
        {
          id: 1,
          name: "Alex Johnson",
          email: "alex.j@example.com",
          joined: "Oct 24, 2026",
          status: "Active",
        },
        {
          id: 2,
          name: "Maria Garcia",
          email: "m.garcia99@example.com",
          joined: "Oct 24, 2026",
          status: "Active",
        },
        {
          id: 3,
          name: "James Wilson",
          email: "jwilson_travel@example.com",
          joined: "Oct 23, 2026",
          status: "Pending Verification",
        },
        {
          id: 4,
          name: "Sophia Lee",
          email: "sophia.l.designs@example.com",
          joined: "Oct 22, 2026",
          status: "Active",
        },
      ],
    };

    const statUsers = document.getElementById("stat-users");
    const statTrips = document.getElementById("stat-trips");
    const tbody = document.getElementById("users-table-body");

    if (statUsers) statUsers.textContent = data.total_users.toLocaleString();
    if (statTrips) statTrips.textContent = data.total_trips.toLocaleString();
    if (tbody) {
      tbody.innerHTML = "";
      data.recent_users.forEach((user) => {
        const statusClass =
          user.status === "Active" ? "badge-active" : "badge-pending";
        tbody.innerHTML += `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.joined}</td>
                        <td><span class="badge ${statusClass}">${user.status}</span></td>
                        <td>
                            <button class="btn-action btn-edit">Edit</button>
                            <button class="btn-action btn-delete">Delete</button>
                        </td>
                    </tr>
                `;
      });
    }
  } catch (e) {
    console.error("Error loading admin dashboard", e.message);
  }
});
