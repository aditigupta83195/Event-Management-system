                                                🎉 Smart Event Management System

A modern web-based application to manage college events efficiently with **registration, QR-based check-in, and live attendance tracking**.

---

# 🚀 Features

* 🎟️ Event Registration
* 👤 User Selection
* 📊 Live Attendance Count
* 🟢 Event Status (Available / Ongoing / Full)
* 🔐 Duplicate Registration Prevention
* 📱 QR Code Generation
* ✅ Check-in via QR or REG ID
* 🎨 Modern UI (React)

---

# 🛠️ Tech Stack

| Layer    | Technology      |
| -------- | --------------- |
| Frontend | React.js        |
| Backend  | Django          |
| Database | SQLite          |
| API      | REST (JSON)     |
| QR Code  | Python `qrcode` |

---

# 📂 Project Structure

```
EventManagement/
│
├── config/              # Django project
│   └── api/             # Main app (models, views, urls)
│
├── frontend/            # React app
│
├── media/qr_codes/      # Generated QR images
├── requirements.txt
└── venv/
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone / Copy Project

```
git clone <repo-url>
cd EventManagement
```

---

## 2️⃣ Create Virtual Environment

### Windows:

```
python -m venv venv
venv\Scripts\activate
```

### macOS/Linux:

```
python3 -m venv venv
source venv/bin/activate
```

---

## 3️⃣ Install Dependencies

```
pip install -r requirements.txt
```

---

## 4️⃣ Run Migrations

```
python manage.py migrate
```

---

## 5️⃣ Create Admin User (Optional)

```
python manage.py createsuperuser
```

---

## 6️⃣ Run Backend Server

```
python manage.py runserver
```

Backend runs at:
👉 http://127.0.0.1:8000/

---

## 7️⃣ Run Frontend

```
cd frontend
npm install
npm start
```

Frontend runs at:
👉 http://localhost:3000/

---

# 🔄 Application Flow

1. Select User 👤
2. Select Event 🎯
3. Click Register 🎟️
4. Get QR Code + Check-in Link
5. Scan or Click to Check-in ✅

---

# 📡 API Endpoints

| Endpoint         | Method | Description     |
| ---------------- | ------ | --------------- |
| `/users/`        | GET    | Get all users   |
| `/events/`       | GET    | Get all events  |
| `/register/`     | POST   | Register user   |
| `/checkin/`      | POST   | Manual check-in |
| `/checkin/<id>/` | GET    | QR check-in     |

---

# ⚠️ Notes

* QR code uses `localhost`, so it may not work on mobile devices directly
* Use the **clickable check-in link** for testing
* Make sure backend runs before frontend

---

# 📚 Learning Highlights

* Full-stack development (React + Django)
* REST API integration
* QR-based workflow
* Real-time UI updates
* Debugging & deployment basics

---

# 🔮 Future Improvements

* 🔐 User Authentication (Login system)
* 📊 Admin Dashboard
* 📧 Email Notifications
* 🎟️ Downloadable Tickets
* ☁️ Cloud Deployment

---

# 👨‍💻 Author

Developed as a college project to demonstrate **real-world event management automation using modern web technologies**.

---



