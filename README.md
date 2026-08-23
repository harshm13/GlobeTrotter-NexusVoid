# 🌍 GlobeTrotter 

> A premium travel itinerary and budget planning application brought to you by the **Nexus Void** community.

GlobeTrotter is a full-stack web application designed to help users seamlessly plan trips, manage daily itineraries, add custom stops, and track travel budgets. Built with a focus on aesthetics and performance, it features a stunning, responsive **glassmorphism** UI and a high-speed Python backend.

---

## ✨ Key Features

* **Glassmorphism UI:** A modern, frosted-glass interface featuring custom backdrop filters, translucent cards, and smooth CSS3 animations.
* **Interactive Itinerary Builder:** A two-column workspace to search for destinations/activities and drag-and-drop them into a day-by-day timeline.
* **Financial Dashboard:** A visual budget tracker that breaks down estimated costs by accommodation, transport, and activities.
* **Secure Authentication:** Robust user login and registration powered by JWT (JSON Web Tokens).

---

## 🛠️ Tech Stack

### Frontend
* **HTML5 & CSS3:** Pure Vanilla implementation for the premium glassmorphism aesthetic without heavy framework bloat.
* **Vanilla JavaScript:** Efficient DOM manipulation, state management, and Fetch API integration.

### Backend
* **Python & FastAPI:** High-performance RESTful API routing and automatic OpenAPI documentation.
* **SQLModel & SQLite:** Modern ORM data modeling connected to a lightweight, file-based database (`globe_trotter.db`).
* **Authentication:** JWT for secure, stateless user sessions.

---

## 📂 Project Structure

```text
GlobeTrotter-NexusVoid/
├── frontend/                     # Client-side user interface
│   ├── pages/                    # Core screens (dashboard, trips, itinerary, budget)
│   ├── css/                      # Stylesheets (glassmorphism UI variables)
│   ├── js/                       # Modular scripts (api.js, auth.js, itinerary.js)
│   └── index.html                # Entry point (Glassmorphic Auth Screen)
└── backend/                      # Server-side FastAPI application
    ├── main.py                   # API entry point & router initialization
    ├── database.py               # SQLite engine & session management
    ├── models.py                 # SQLModel database tables 
    ├── routers/                  # API endpoints (users, trips, activities)
    ├── core/                     # Security logic (JWT, password hashing)
    └── requirements.txt          # Python dependencies
