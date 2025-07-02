# 🧑‍💼 Employee Management System (EMS)

A full-stack Employee Management System with secure login using **JWT (JSON Web Tokens)**. Built as part of a hands-on project to manage employee records through a modern web interface with protected API routes.

---

## 🚀 Features

- 🔐 Secure Login & Authentication (JWT)
- 📋 View, Add, Edit, and Delete Employees
- ⚙️ React Frontend with Vite
- 🛠️ Node.js + Express Backend
- 🔄 RESTful API Communication
- 🧾 Clean and Responsive UI

---

## 🧩 Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | React, Vite, Tailwind         |
| Backend    | Node.js, Express.js           |
| Auth       | JSON Web Tokens (JWT)         |
| API Format | REST                          |

---

## 📁 Project Structure

Prodigy_FS_02/
├── frontend/ # React app (Vite)
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/ # Node.js + Express API
│ ├── routes/
│ ├── controllers/
│ ├── server.js
│ └── package.json
│
└── .gitignore

yaml
Copy
Edit

---

## 🛠️ Getting Started

## 1. Clone the repository
```bash
git clone https://github.com/Jeevankiran1503/Prodigy_FS_02.git
cd Prodigy_FS_02
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
Create a .env file in the backend/ folder:

ini
Copy
Edit
PORT=5000
JWT_SECRET=your_jwt_secret_key
Then run the server:

bash
Copy
Edit
npm start
3. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm run dev
```
🔐 JWT Authentication Flow
User logs in with credentials.

A token is generated and stored on the client.

All protected API requests include the token in headers.

The backend verifies the token before granting access.

📌 Future Improvements
✅ Basic CRUD for Employees

🔒 Role-based access (admin/user)

🧮 Add database (MongoDB/PostgreSQL)

💬 Better form validations and user feedback

📈 Deployment on Render/Vercel


👤 Author
Jeevan Kiran
