# How to Set Up and Run the Project

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or later)
- **Python** (3.8 or later)
- **MySQL** server
- **npm** (comes with Node.js)
- **pip** (comes with Python)

---

## Setup and Run Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Set Up and Run Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Set Up and Run Backend

```bash
cd ../backend
npm install
npm run dev
```

### 4. Set Up and Run Flask Backend

```bash
cd ../flask_backend
pip install -r requirements.txt
venv\Scripts\activate
python run.py
```

### 5. Create MySQL Database

- Create a new MySQL database.

### 6. Create .env file in backend

- **Add the following environment variables in .env file**
- **DB_NAME**
- **DB_USER**
- **DB_PASSWORD**
- **DB_HOST**
- **JWT_SECRET**
- **PORT=8000**
- **NODE_ENV=development**
