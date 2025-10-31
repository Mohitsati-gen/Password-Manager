💻 Password Manager – React + MongoDB

This repository contains two versions of my Password Manager app — one that stores data in LocalStorage and another that uses MongoDB with Express.js as the backend.

🧠 Overview

Version	Description	Tech Stack

PassMan (LocalStorage)	Password Manager built entirely on the frontend using browser’s localStorage for data persistence.	React, Tailwind CSS, Toastify
PassMan Mongo	Full-stack Password Manager connected to MongoDB using Express backend.	React, Express.js, MongoDB, Node.js, Toastify

⚙️ Setup Instructions


🧩 For LocalStorage version (PassMan)


cd "PassMan"

npm install

npm run dev


🧠 For MongoDB version (PassMan Mongo)


cd "PassMan Mongo/backend"

npm install

node server.js



Then, in a new terminal:


cd "PassMan Mongo"

npm install

npm run dev


🌐 API Endpoints (Mongo Version)


Method	  Endpoint	    Description

GET       	/	       Fetch all saved passwords

POST	      /	        Save a new password

DELETE	    /	         Delete a password


🔒 Features

1=Save, Edit, and Delete passwords

2=Show/hide password toggle

3=LocalStorage version for offline use

4=MongoDB version for database persistence

5=Toast notifications on save/delete

6=Clean, responsive UI (Tailwind CSS)

🧰 Tech Stack

Frontend: React, Tailwind CSS, React Toastify

Backend: Node.js, Express.js, MongoDB

Database: MongoDB (local or cloud)


✨ Author

👨‍💻 Mohit Sati
🎓 B.Tech Student, IIIT Ranchi

🧾 License

This project is licensed under the MIT License – feel free to use, modify, and improve it.

💬 Feedback

If you like this project, don’t forget to ⭐ the repo and share your feedback!
