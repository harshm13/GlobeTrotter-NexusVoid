# GlobeTrotter ✈️

**Plan your ultimate travel itinerary.**

GlobeTrotter is a full-stack web application designed to help users seamlessly plan and organize their travel itineraries. It features a modern, responsive **glassmorphism** user interface connected to a high-performance Python backend with secure user authentication.

---

## ✨ Features

* 🎨 **Modern UI/UX:** Beautiful glassmorphism aesthetic built with pure HTML and CSS.
* 🔐 **Secure Authentication:** User registration and login using bcrypt password hashing and JWT (JSON Web Tokens) for secure session management.
* ⚡ **RESTful API:** Robust and scalable backend endpoints built with FastAPI.
* 🌐 **Cloud Hosted:** Fully deployed and live on the web using Vercel and Render.
* 🔗 **Cross-Origin Ready:** Configured CORS middleware for secure communication between frontend and backend.
* 📱 **Responsive Design:** Designed to work across desktop and mobile screen sizes.
* 🗺️ **Travel Planning:** Organize and manage your travel plans through a dedicated itinerary interface.

---

## 🛠️ Tech Stack

### Frontend

* **HTML5**
* **CSS3**
* **Vanilla JavaScript**
* **Custom Glassmorphism UI**
* **Fetch API**
* **Vercel** — Deployment

### Backend

* **Python 3**
* **FastAPI** — REST API framework
* **SQLModel / SQLAlchemy** — Database ORM
* **Passlib / Bcrypt** — Password hashing
* **Python-JOSE** — JWT authentication
* **Uvicorn** — ASGI server
* **Render** — Backend deployment

---

## 🚀 Live Demo

### 🌐 Frontend

**GlobeTrotter Web App:**
https://globetrotter-nexusvoid-git-main-nexus-void1.vercel.app/

### ⚙️ Backend API

The backend is deployed on Render.

FastAPI automatically provides interactive Swagger API documentation at:

```text
https://YOUR-RENDER-URL/docs
```

Replace `YOUR-RENDER-URL` with your deployed Render backend URL.

---

## 📸 Preview

> Add a screenshot of the GlobeTrotter glassmorphism interface here.

```markdown
![GlobeTrotter Preview](frontend/assets/image_f21b05.jpg)
```

You can replace the path above with the actual location of your screenshot.

---

# 💻 Local Development Setup

Follow the steps below to run GlobeTrotter locally.

## 1. Clone the Repository

```bash
git clone https://github.com/harshm13/GlobeTrotter-NexusVoid.git
cd GlobeTrotter-NexusVoid
```

---

## 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

### Create a Virtual Environment

#### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
SECRET_KEY=your_super_secret_jwt_key_here
```

> ⚠️ Never commit your real `.env` file, passwords, API keys, or secret keys to GitHub.

### Start the FastAPI Server

```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

The local API will be available at:

```text
http://127.0.0.1:8000
```

### API Documentation

Open:

```text
http://127.0.0.1:8000/docs
```

FastAPI will display the interactive Swagger API documentation.

---

## 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Open your API configuration file, such as:

```text
frontend/js/auth.js
```

or whichever JavaScript file contains your API configuration.

Change the API base URL to your local backend:

```javascript
const API_BASE_URL = "http://127.0.0.1:8000";
```

Then open:

```text
frontend/index.html
```

You can either open it directly in your browser or use **VS Code Live Server**.

---

# 📂 Project Structure

```text
GlobeTrotter-NexusVoid/
│
├── frontend/
│   ├── css/
│   │   └── ...                  # Glassmorphism styles
│   │
│   ├── js/
│   │   ├── auth.js              # Authentication logic
│   │   ├── api.js               # API communication
│   │   └── ...                  # Other frontend scripts
│   │
│   ├── assets/
│   │   └── ...                  # Images, icons, and other assets
│   │
│   └── index.html               # Main application entry point
│
├── backend/
│   ├── main.py                  # FastAPI application
│   ├── models.py                # SQLModel/Pydantic models
│   ├── database.py              # Database configuration
│   ├── routers/
│   │   └── ...                  # API routes
│   ├── core/
│   │   └── ...                  # Security/configuration
│   ├── requirements.txt         # Python dependencies
│   └── .env                     # Environment variables
│
├── .gitignore
└── README.md                    # Project documentation
```

---

# 🔐 Security

GlobeTrotter uses several security mechanisms to protect user accounts and API communication.

### Authentication

* JWT-based authentication
* Secure password hashing using bcrypt
* Protected API endpoints
* Environment-based secret configuration
* CORS configuration

### Important

Never commit sensitive information such as:

```text
.env
API keys
JWT secret keys
Passwords
Database credentials
```

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
backend/.env
venv/
__pycache__/
*.pyc
*.db
```

---

# 🤝 Community & Support

GlobeTrotter was created as part of the **Nexus Void** development community.

Contributions, bug reports, feature requests, and improvements are welcome!

### Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Commit your changes.
5. Push your branch.
6. Open a Pull Request.

Example:

```bash
git checkout -b feature/new-feature

git add .

git commit -m "feat: add new feature"

git push origin feature/new-feature
```

---

# 🐛 Issues

If you discover a bug or have a feature request, open an issue on the GitHub repository:

https://github.com/harshm13/GlobeTrotter-NexusVoid/issues

When reporting a bug, include:

* Description of the issue
* Steps to reproduce it
* Expected behavior
* Actual behavior
* Relevant screenshots or error messages

---

# 📜 License

This project is open-source and available under the **MIT License**.

---

## 🌍 GlobeTrotter

**Plan your journey. Organize your adventure.**

Built with ❤️ by **Nexus Void**.
