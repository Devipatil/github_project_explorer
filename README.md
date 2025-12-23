# 📊 GitHub Project Explorer

An interactive Open Source GitHub Repository Explorer built using React, Vite, Tailwind CSS, and GitHub REST API.
This application helps developers discover trending repositories, analyze repository statistics through charts, bookmark projects, and add personal notes.

---

## 🚀 Features

- 🔍 Search GitHub Repositories by keyword
- 🏷 Filter by Programming Language
- ⭐ Sort repositories by:
   - Stars
   - Last Updated
- 📈 Analytics Dashboard
- Stars distribution
- Language-based insights
- Repository statistics (via Chart.js)
- 🔖 Bookmark repositories
- 📝 Add personal notes to bookmarked repositories
- 🌗 Dark / Light Mode
- ⚡ Fast performance using Vite

---

## 🛠 Tech Stack

- Technology	Purpose
- React.js	Frontend UI
- Vite	Build tool & dev server
- Tailwind CSS	Styling & responsive design
- GitHub REST API	Fetch repository data
- Chart.js + react-chartjs-2	Data visualization
- JavaScript (ES6+)	Application logic
  
  ---
  
## 📂 Project Structure
```
github-project-explorer/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```
--- 

## 🔐 Environment Variables

Create a .env file in the project root:
VITE_GITHUB_TOKEN=your_github_personal_access_token

Required to avoid GitHub API rate limits.

--- 

## ⚙️ Installation & Setup

1️⃣ Clone the Repository
git clone https://github.com/your-username/github-project-explorer.git
cd github-project-explorer

2️⃣ Install Dependencies
npm install

3️⃣ Run the Project
npm run dev

4️⃣ Open in Browser
http://localhost:5173/

---

## 📊 Analytics & Charts

The dashboard provides:

- Language distribution of repositories
- Star-based comparison
- Repository trend insights
- Charts are built using Chart.js for clear and interactive visualization.

---

## 🚀 Future Enhancements

- Authentication

- Backend integration (Spring Boot)

- User-specific bookmarks

- Pagination & infinite scrolling

- Deployment with CI/CD

---

## 👩‍💻 Author

**Devi Patil**
