# 🚆 Rail Madad AI

### AI-Powered Railway Complaint Management System

Rail Madad AI is a lightweight, offline-first **AI-powered complaint management system** designed to register, analyze, classify, prioritize, route, track, and manage railway passenger complaints.

The project is built primarily around a **CLI (Command Line Interface)** so that the complete core system can be demonstrated directly from the terminal.

A React frontend and Express API are planned as additional interfaces around the same backend services.

---

## 📌 Project Overview

Railway passengers can face problems such as:

* AC or electrical problems
* Dirty coaches
* Water shortages
* Food-related issues
* Security problems
* Staff behaviour complaints
* Medical emergencies
* Coach damage
* Ticketing problems
* Train delays

Rail Madad AI provides a centralized system where a complaint can be registered and then processed using lightweight local AI/rule-based techniques.

### Basic Flow

```text
Passenger Complaint
        ↓
Complaint Registration
        ↓
SQLite Database
        ↓
AI Analysis
        ↓
┌─────────────────────────┐
│ Category Classification │
│ Priority Detection      │
│ Sentiment Analysis      │
│ Smart Routing           │
└─────────────────────────┘
        ↓
Department Assignment
        ↓
Status Tracking
        ↓
Resolution
        ↓
Analytics & Reports
```

---

# 🎯 Main Objectives

The main objectives of Rail Madad AI are:

1. Register passenger complaints.
2. Generate a unique complaint ID.
3. Store complaints permanently in SQLite.
4. Automatically classify complaints.
5. Detect complaint priority.
6. Analyze complaint sentiment.
7. Route complaints to the appropriate department.
8. Track complaint status and history.
9. Search and view complaints.
10. Generate analytics and reports.
11. Detect recurring problems.
12. Provide predictive-maintenance insights.
13. Support resource allocation.
14. Provide staff assistance.
15. Provide a React web interface in addition to the CLI.

---

# 🛠️ Technology Stack

| Technology     | Purpose                   |
| -------------- | ------------------------- |
| JavaScript     | Main programming language |
| Node.js        | Backend/runtime           |
| Inquirer       | Interactive CLI           |
| SQLite         | Local database            |
| better-sqlite3 | SQLite integration        |
| Express.js     | REST API                  |
| React          | Frontend                  |
| Vite           | React development server  |
| Tesseract.js   | OCR                       |
| Sharp          | Image processing          |
| Git & GitHub   | Version control           |

---

# 🧠 AI Approach

This project uses **lightweight local AI/rule-based intelligence**.

It does **not** depend on OpenAI, Gemini, cloud APIs, or an internet connection for its core AI analysis.

The system uses keywords and simple rules to demonstrate AI-style decision making.

This makes the project:

* Easy to understand
* Easy to demonstrate
* Offline-friendly
* Fast
* Explainable
* Suitable for a prototype

> The project does not claim to use deep learning. Its current intelligence is based on lightweight keyword/rule-based analysis.

---

# 🤖 AI Features

## 1. Category Classification

The complaint description is analyzed and assigned to a category.

Supported categories include:

```text
Cleanliness
Maintenance
Electrical
Water Supply
Food
Security
Staff Behaviour
Medical
Coach Damage
Ticketing
Train Delay
Other
```

### Example

```text
Complaint:
"AC is not working"

Result:
Category → Electrical
Confidence → 60%
```

---

## 2. Priority Detection

Complaints are assigned one of four priority levels:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

### Example

```text
"There is a fire in the coach"
        ↓
CRITICAL
```

```text
"Someone stole my bag"
        ↓
HIGH
```

```text
"AC is not working"
        ↓
MEDIUM
```

```text
"I have a general question"
        ↓
LOW
```

Critical keywords include examples such as:

* Fire
* Accident
* Injury
* Medical emergency
* Security threat
* Violence
* Explosion

---

# 😊 Sentiment Analysis

The system performs lightweight sentiment analysis.

Possible results:

```text
POSITIVE
NEUTRAL
NEGATIVE
```

### Example

```text
"The service is terrible"
        ↓
NEGATIVE
```

```text
"The coach is clean and comfortable"
        ↓
POSITIVE
```

---

# 🏢 Smart Routing

After classification, the complaint is automatically routed to an appropriate department.

Example mapping:

| Category        | Department             |
| --------------- | ---------------------- |
| Electrical      | Electrical Maintenance |
| Cleanliness     | Housekeeping           |
| Maintenance     | Maintenance Department |
| Water Supply    | Water & Sanitation     |
| Food            | Catering Department    |
| Security        | Railway Security       |
| Staff Behaviour | Staff Administration   |
| Medical         | Medical Department     |
| Coach Damage    | Coach Maintenance      |
| Ticketing       | Ticketing Department   |
| Train Delay     | Operations Department  |
| Other           | General Help Desk      |

### Example

```text
Complaint
   ↓
"AC is not working"
   ↓
Electrical
   ↓
Electrical Maintenance
```

---

# 🗄️ Database

The project uses **SQLite** for local data storage.

Database location:

```text
database/rail_madad.db
```

The system stores complaint information such as:

```text
Complaint ID
Passenger Name
Phone
Train Number
PNR
Coach Number
Seat Number
Journey Date
Description
Media Path
Media Type
Category
Confidence
Priority
Department
Sentiment
OCR Text
Metadata
Status
Official Remarks
Created At
Updated At
Resolved At
```

---

# 📊 Complaint Status

The system supports complaint lifecycle tracking.

Possible statuses include:

```text
REGISTERED
AI_ANALYZED
ROUTED
ASSIGNED
UNDER_INVESTIGATION
ACTION_TAKEN
RESOLVED
CLOSED
REOPENED
```

Every status update is stored in the status history.

Example:

```text
REGISTERED
     ↓
UNDER_INVESTIGATION
     ↓
ACTION_TAKEN
     ↓
RESOLVED
     ↓
CLOSED
```

---

# 🖥️ CLI Interface

The CLI is the primary interface of the project.

Run:

```bash
npm start
```

or:

```bash
npm run cli
```

The CLI provides options such as:

```text
1. Register Complaint
2. Analyze Complaint
3. View Complaint
4. Track Complaint
5. Update Complaint Status
6. Status History
7. Search Complaints
8. View All Complaints
9. Analytics
10. Recurring Issue Detection
11. Predictive Maintenance
12. Resource Allocation
13. Staff AI Assistant
14. Performance Analysis
15. Reports
16. System Information
0. Exit
```

> Only options that have been implemented and tested should be enabled in the final version.

---

# 📝 Complaint Registration

When registering a complaint, the system collects information such as:

```text
Passenger Name
Phone Number
Train Number
PNR
Coach Number
Seat Number
Journey Date
Complaint Description
Media Type
```

A unique complaint ID is generated automatically.

Example:

```text
RM202609199512
```

---

# 🔍 Example AI Analysis

Suppose the passenger submits:

```text
AC is not working
```

The system can produce:

```text
Category     : Electrical
Confidence   : 60%
Priority     : MEDIUM
Sentiment    : NEGATIVE
Department   : Electrical Maintenance
```

The information is then stored in SQLite.

---

# 📁 Project Structure

Current/target project structure:

```text
rail-madad-ai/
│
├── database/
│   └── rail_madad.db
│
├── reports/
│
├── sample_media/
│
├── src/
│   │
│   ├── ai/
│   │   ├── classifier.js
│   │   ├── priority.js
│   │   ├── sentiment.js
│   │   └── router.js
│   │
│   ├── cli/
│   │   ├── index.js
│   │   ├── menu.js
│   │   └── commands.js
│   │
│   ├── database/
│   │   ├── database.js
│   │   └── schema.js
│   │
│   ├── services/
│   │   └── complaintService.js
│   │
│   ├── utils/
│   │   └── helpers.js
│   │
│   └── server/
│       └── server.js
│
├── frontend/
│
├── package.json
├── package-lock.json
└── README.md
```

---

# 🔄 System Architecture

```text
                 ┌─────────────────┐
                 │   CLI Interface │
                 └────────┬────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Complaint Service │
                └─────────┬─────────┘
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ AI Layer │ │ Database │ │  Utils   │
        └──────────┘ └──────────┘ └──────────┘
              │           │
              ▼           ▼
       Classification    SQLite
       Priority
       Sentiment
       Routing
```

The React frontend and Express API use the same underlying services instead of implementing separate business logic.

---

# 📦 Installation

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

## 2. Enter the project

```bash
cd rail-madad-ai
```

## 3. Install dependencies

```bash
npm install
```

---

# ▶️ Running the Project

## Run CLI

```bash
npm start
```

or:

```bash
npm run cli
```

## Run Express Server

```bash
npm run server
```

## Run React Frontend

```bash
npm run frontend
```

---

# 🧪 Testing

Individual AI modules can be tested directly.

### Category Classification

```bash
node -e "import { classifyComplaint } from './src/ai/classifier.js'; console.log(classifyComplaint('AC is not working'))"
```

### Priority

```bash
node -e "import { detectPriority } from './src/ai/priority.js'; console.log(detectPriority('There is a fire in the coach'))"
```

### Sentiment

```bash
node -e "import { analyzeSentiment } from './src/ai/sentiment.js'; console.log(analyzeSentiment('The service is terrible'))"
```

### Routing

```bash
node -e "import { routeComplaint } from './src/ai/router.js'; console.log(routeComplaint('Electrical'))"
```

---

# 🔬 Verified AI Pipeline

The current tested pipeline is:

```text
Complaint Description
        ↓
Category Classification
        ↓
Priority Detection
        ↓
Sentiment Analysis
        ↓
Smart Routing
        ↓
SQLite Storage
```

For the existing test complaint:

```text
Complaint ID:
RM202609199512

Description:
ac not wotking
```

The verified analysis is:

```text
Category     : Electrical
Confidence   : 0.6
Priority     : MEDIUM
Sentiment    : NEGATIVE
Department   : Electrical Maintenance
```

---

# 📈 Analytics

The planned analytics module calculates values from the actual SQLite database.

Examples:

```text
Total Complaints
Resolved Complaints
Pending Complaints
Critical/High Priority Complaints
Average Resolution Time
Top Complaint Category
Most Reported Train
Department Workload
```

The system should calculate these values dynamically rather than using hardcoded numbers.

---

# 🔁 Recurring Issue Detection

Historical complaints can be analyzed to identify frequently occurring problems.

Example:

```text
Train 12824
   ↓
Repeated AC complaints
   ↓
High frequency detected
   ↓
Potential recurring issue
```

This can help identify components or trains that may require attention.

---

# 🔮 Predictive Maintenance

The project includes a prototype predictive-maintenance feature based on historical complaint frequency.

Example:

```text
Repeated complaints
       ↓
Historical frequency
       ↓
Pattern detected
       ↓
Potential maintenance requirement
```

This is a prototype analytical feature rather than a production machine-learning prediction model.

---

# 👨‍💼 Staff AI Assistant

The staff assistant can use complaint information to provide simple recommended actions.

Example:

```text
Priority: CRITICAL
Category: Security
Department: Railway Security

Suggested Action:
Immediately forward the complaint to the security department.
```

---

# 📊 Reports

The system can generate text reports inside:

```text
reports/
```

Example:

```text
reports/report-YYYY-MM-DD.txt
```

Reports can contain:

* Complaint statistics
* Category distribution
* Priority distribution
* Department workload
* Resolution information
* Important complaints

---

# 🌐 REST API

The project also provides an Express API.

Planned endpoints:

```text
GET    /api/complaints
GET    /api/complaints/:id
POST   /api/complaints
PUT    /api/complaints/:id/status
GET    /api/analytics
GET    /api/complaints/:id/analysis
```

The API allows the React frontend to communicate with the backend.

---

# ⚛️ React Frontend

The React interface is an additional interface around the core system.

Planned pages:

```text
Dashboard
Complaints
Complaint Details
Analytics
```

The CLI remains the primary demonstration interface for the core project.

---

# 🛡️ Error Handling

The application should gracefully handle:

* Invalid menu choices
* Invalid complaint IDs
* Missing complaints
* Invalid dates
* Invalid media paths
* Database errors
* OCR errors
* Unsupported media
* Invalid status transitions
* Missing optional libraries

The goal is to prevent the CLI from crashing unexpectedly.

---

# 🔌 Offline First

The core project does not require:

```text
OpenAI API
Gemini API
Cloud AI APIs
Internet connection
```

The core complaint processing uses local JavaScript logic and SQLite.

This makes the project suitable for:

* College demonstrations
* Offline demonstrations
* Classroom presentations
* Prototype development

---

# 🚀 Future Improvements

Possible future improvements include:

* Real ML-based complaint classification
* Better NLP models
* Speech-to-text
* Advanced OCR
* Real video analysis
* Real audio analysis
* Railway API integration
* Authentication
* Role-based access
* Real-time notifications
* Production-grade deployment
* Advanced predictive maintenance models

---

# 👨‍💻 Developer

**Sankalp Tripathi**

B.Tech — Computer Science & AI

Newton School of Technology

---

# 🎓 Project Explanation for Viva

### What is Rail Madad AI?

Rail Madad AI is an AI-powered railway complaint management system that allows passengers' complaints to be registered, analyzed, prioritized, routed, tracked, and stored using a local SQLite database.

### Why did you use SQLite?

SQLite is lightweight, serverless, and easy to use for a college prototype. It allows the complete system to run locally.

### Why use CLI?

The CLI makes the core system simple to demonstrate and ensures the main functionality does not depend on the React frontend.

### What type of AI is being used?

The current prototype uses lightweight rule-based and keyword-based intelligence for classification, priority detection, sentiment analysis, and routing. It is not presented as deep learning.

### How does classification work?

The complaint text is normalized and compared against predefined category keywords. The category with the strongest matching evidence is selected and a simple confidence value is calculated.

### How is priority detected?

The system checks the complaint against critical, high, and medium priority keywords. Critical matches are processed first.

### How does routing work?

After classification, the category is mapped to an appropriate department.

For example:

```text
Electrical
     ↓
Electrical Maintenance
```

### Where is the data stored?

The complaint data is stored in:

```text
database/rail_madad.db
```

using SQLite.

---

# 📌 Current Development Status

| Feature                 | Status     |
| ----------------------- | ---------- |
| Node.js Project Setup   | ✅          |
| SQLite Database         | ✅          |
| CLI                     | ✅          |
| Complaint Registration  | ✅          |
| Complaint ID Generation | ✅          |
| View Complaint          | ✅          |
| Track Complaint         | ✅          |
| Status Updates          | ✅          |
| Status History          | ✅          |
| Category Classification | ✅ Tested   |
| Priority Detection      | ✅ Tested   |
| Sentiment Analysis      | ✅ Tested   |
| Smart Routing           | ✅ Tested   |
| SQLite AI Integration   | ✅ Tested   |
| Media Analysis          | 🔄 Planned |
| OCR                     | 🔄 Planned |
| Search                  | 🔄 Planned |
| Analytics               | 🔄 Planned |
| Predictive Maintenance  | 🔄 Planned |
| Resource Allocation     | 🔄 Planned |
| Staff AI Assistant      | 🔄 Planned |
| Reports                 | 🔄 Planned |
| Express API             | 🔄 Planned |
| React Frontend          | 🔄 Planned |

---

# ⭐ Project Goal

The final goal is to build a simple but complete prototype where:

```text
Passenger
    ↓
Register Complaint
    ↓
AI Analysis
    ↓
Category
    ↓
Priority
    ↓
Sentiment
    ↓
Department Routing
    ↓
Investigation
    ↓
Action
    ↓
Resolution
    ↓
Analytics & Reports
```
