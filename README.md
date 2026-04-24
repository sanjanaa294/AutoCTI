# 🛡️ AutoCTI – Automated Cyber Threat Detection using AutoML
> A real-time cybersecurity system that detects and blocks threats from platforms like WhatsApp, Gmail, and browsers using AutoML and a Chrome Extension.

---

## ⚡ Overview
AutoCTI is a cyber threat detection system designed to identify malicious activities such as phishing links, suspicious URLs, and brute-force attacks in real time.

Attackers often send malicious links through platforms like WhatsApp, Gmail, and other applications. AutoCTI monitors such activities and detects threats instantly.

Unlike traditional antivirus systems that rely on static signatures, AutoCTI uses machine learning (AutoML) to detect both known and unknown threats.

---

## 🔥 Key Highlights
- Real-time threat detection  
- AutoML-based model selection  
- Chrome Extension for URL monitoring  
- React Dashboard for visualization  
- Automated threat blocking  
- Modular system (add new threat models easily)  
- Reduced false positives  

---

## 📸 Screenshots

### 🔐 Login Page
![Login Page](assests/images/login.jpeg)

### 📊 Dashboard
![Dashboard](assests/images/homepage.png)

---

## 🧠 System Workflow
User clicks link (WhatsApp / Gmail / Web)  
↓  
Opens in Chrome  
↓  
Chrome Extension captures URL  
↓  
Sends to FastAPI backend  
↓  
AutoML model analyzes  
↓  
Classifies as Safe / Suspicious / Phishing  
↓  
If threat → Block + Update dashboard  

---

## 🏗️ Tech Stack
- Backend: FastAPI (Python)  
- Frontend: React.js  
- ML: AutoML (H2O / Auto-sklearn)  
- Extension: Chrome Extension (JavaScript)  
- Communication: REST APIs / WebSockets  

---

## ⚠️ Threat Types Detected
- Phishing URLs  
- Suspicious / shortened links  
- Brute-force attempts  
- Malware (Partially Implemented)  

---

## 📊 Severity Levels
- Low – Slightly suspicious  
- Medium – Potential threat  
- High – Confirmed malicious  

---

## ⚙️ Setup Guide

### Backend
- cd backend
- pip install -r requirements.txt
- uvicorn main:app --reload

### Frontend
- cd frontend
- npm install
- npm start


### Chrome Extension
1. Open chrome://extensions/  
2. Enable Developer Mode  
3. Click Load unpacked  
4. Select extension folder  

---

## 📌 Project Status
- Phishing Detection – Completed  
- Dashboard – Completed  
- Chrome Extension – Completed  
- Malware Detection – In Progress  

---

## 🚀 Future Scope
- Advanced malware detection  
- Cloud deployment  
- Explainable AI  
- Continuous retraining  

---

## ⚠️ Limitations
- Depends on dataset quality  
- Needs continuous updates  
- Malware module under development  

---

## 🆚 Comparison with Antivirus
- Antivirus → Signature-based  
- AutoCTI → Machine learning-based  

- Antivirus → Detects known threats  
- AutoCTI → Detects new threats  

---

## 👨‍💻 Team
- Preetham  
- Sanjana A Padukone  
- Sakshi V Moger  
- Sreedevi P  

---

## 📢 Disclaimer
This project is for academic purposes.  
All phishing examples are used only for demonstration.

---

## ⭐ Final Note
AutoCTI detects and blocks cyber threats in real time and adapts to new threats using a modular AutoML approach.
