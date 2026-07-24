# College-AI-Assitant
AI-Powered College Digital Assistant with ERP Integration built using React, Node.js, Express, MySQL, Prisma, and AI.

# College AI Assistant

## Overview

This project is an AI-Powered College Digital Assistant integrated with a College ERP System.

The system helps:

- Students
- Parents
- Faculty
- Administrators

to access college information through an intelligent chatbot and a secure web application.

---

## Technology Stack

### Frontend

- React
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- MySQL

### Authentication

- JWT
- BCrypt

### Caching

- Redis

### Deployment

- Docker
- Nginx

---

## Current Progress

✅ Day 1 Completed

- Project Planning
- System Architecture
- Technology Stack Selection
- Project Folder Structure
- ## Current Progress

### ✅ Day 1 - Project Planning & Setup

* Project Planning
* System Architecture Design
* Technology Stack Selection
* Project Folder Structure
* Git & GitHub Setup
* Initial Project Documentation

---

### ✅ Day 2 - Database Planning & Design

* Learned Database Fundamentals
* Understood Tables, Records, and Columns
* Studied Primary Keys and Foreign Keys
* Learned Database Relationships (One-to-One, One-to-Many, Many-to-Many)
* Identified Main System Entities

  * Users
  * Students
  * Faculty
  * Departments
  * Courses
  * Subjects
  * Attendance
  * Results
  * Notices
  * FAQs
  * Knowledge Base
  * Chat History
* Designed the Initial Entity Relationship (ER) Diagram
* Planned the Database Structure for a Production-Ready Application
* Uploaded Project Documentation and ER Diagram to GitHub

---

## Next Milestone

### 🚀 Day 3 - MySQL Database Development

* Create MySQL Database
* Design Database Tables
* Define Primary Keys & Foreign Keys
* Build Database Relationships
* Prepare Database for Backend Integration

---

## Project Status

**Current Phase:** Database Planning & Design

**Progress:** 2 / 30 Days Completed (≈7%)

## Current Progress

### ✅ Day 3 Completed

- Created MySQL database
- Created database/schema.sql
- Designed and implemented Users table
- Learned SQL constraints (PRIMARY KEY, UNIQUE, NOT NULL)
- Tested INSERT and SELECT queries
- Verified table structure using DESCRIBE
## ✅ Day 4 Completed

### Database

- Created Students table
- Connected Students table with Users table
- Implemented Foreign Key relationship

### Learning

- Primary Key
- Foreign Key
- One-to-One Relationship
- Referential Integrity

### GitHub

- Updated schema.sql
- Pushed latest database changes

- ## ✅ Day 5 Completed

### Database

- Learned Database Normalization
- Created Departments table
- Inserted sample departments
- Prepared database for scalable design

### Learning

- Database Normalization
- Data Redundancy
- Production Database Design

- ## ✅ Day 6 Completed

### Database

- Created Faculty table
- Connected Faculty table with Users
- Tested Faculty table

### Learning

- User Roles
- Database Relationships
- Faculty Management

## ✅ Day 7 Completed

### Database
- Learned Database Migration
- Added department_id to Students table
- Added department_id to Faculty table
- Connected Students with Departments
- Connected Faculty with Departments

### Learning
- ALTER TABLE
- One-to-Many Relationship
- Database Migration
- Production Database Design

### GitHub
- Updated schema.sql
- Committed and pushed latest changes

## ✅ Day 8 Completed

### Backend Setup

- Created backend folder
- Initialized Node.js project
- Installed Express.js
- Installed TypeScript
- Installed Prisma ORM
- Created backend folder structure
- Created first Express server
- Successfully ran the backend server

### Learning

- Backend Architecture
- Node.js
- Express.js
- Routes
- Request & Response
- Port

- ## ✅ Day 9 Completed

### Prisma & Database Integration

- Installed Prisma ORM
- Configured Prisma with MySQL
- Created Prisma Client
- Connected Express Backend to MySQL
- Successfully tested database connection

### Learning

- ORM (Object Relational Mapping)
- Prisma
- Prisma Client
- Environment Variables (.env)
- Database Connection

## ✅ Day 10 Completed

### First REST API Development

- Created Routes Folder
- Created Controllers Folder
- Implemented Student Route
- Implemented Student Controller
- Connected Routes with Express Application
- Successfully Tested First API

### Learning

- REST API Basics
- Route
- Controller
- Request & Response
- Backend Request Flow

### API Created

GET /students

Response:

```json
{
  "message": "Student Controller Working"
}
```
## ✅ Day 11 Completed

### Student Service with Prisma

Implemented the service layer to fetch real student data from the MySQL database using Prisma ORM.

### Features Completed

- Created `student.service.ts`
- Connected Controller to Service
- Retrieved student records using Prisma
- Included related User and Department information
- Tested API successfully

### API Endpoint

**GET /students**

Returns all student records from the database along with their associated user and department details.

### Concepts Learned

- Service Layer
- Business Logic
- Prisma `findMany()`
- `include`
- Async/Await
- Database Querying
## ✅ Day 12 Completed

### Dynamic Student API

Implemented dynamic student retrieval using Route Parameters and Prisma ORM.

### Features Completed

- Created GET /students/:id API
- Used Route Parameters (`:id`)
- Retrieved a single student using Prisma `findUnique()`
- Added error handling for missing students
- Successfully tested all API endpoints

### API Endpoints

- GET /students → Returns all students
- GET /students/:id → Returns one student by ID

### Concepts Learned

- Route Parameters
- req.params
- Dynamic Routes
- Prisma findUnique()
- Error Handling
- HTTP 404 Response

- ## Day 13 Completed ✅

### Completed Tasks
- Learned HTTP POST method
- Learned req.body in Express
- Created Student POST API
- Used Prisma create() method
- Tested API using Thunder Client
- Successfully inserted student records into MySQL

### APIs Completed
- GET /students
- GET /students/:id
- POST /students

### Status
Backend CRUD Progress: 
-Create ✅
-Read ✅
## Day 14 Completed ✅

### Completed Tasks
- Learned HTTP PUT Method
- Implemented Update Student API
- Used Prisma update() method
- Updated student data in MySQL
- Tested API using Thunder Client

### APIs Completed
- GET /students
- GET /students/:id
- POST /students
- PUT /students/:id

### Status
Backend CRUD Progress:
- Create ✅
- Read ✅
- Update ✅
- ## Day 15 Completed ✅

### Completed Tasks
- Learned HTTP DELETE Method
- Implemented Delete Student API
- Used Prisma delete() method
- Deleted student records from MySQL
- Tested API using Thunder Client

### APIs Completed
- GET /students
- GET /students/:id
- POST /students
- PUT /students/:id
- DELETE /students/:id

### Status
Student Module CRUD:
- Create ✅
- Read ✅
- Update ✅
- Delete ✅
## Day 16 Completed ✅

### Completed Tasks
- Created Authentication Module
- Implemented Login API
- Created Authentication Service
- Created Authentication Controller
- Created Authentication Routes
- Connected Login API with MySQL Database
- Tested Login API using Thunder Client

### APIs Completed
- POST /auth/login

### Authentication Features
- Login with Email
- Password Verification
- Invalid Login Handling
- Proper HTTP Status Codes

### Status
Authentication Module:
- Login API ✅
## ✅ Day 17 - Secure User Registration with bcrypt

### Completed
- Installed bcrypt and TypeScript types
- Added secure Register API
- Implemented password hashing using bcrypt
- Prevented duplicate email registration
- Successfully stored hashed passwords in MySQL
- Tested Register API using Thunder Client

### Concepts Learned
- Authentication
- Password Hashing
- Salt Rounds
- bcrypt.hash()
- Secure User Registration

### Status
✅ Register API Completed
⏳ Secure Login (Next Day)
## ✅ Day 18 - Secure Login with bcrypt

### Completed
- Updated Login API to use bcrypt.compare()
- Removed plain-text password comparison
- Successfully authenticated users with hashed passwords
- Tested secure login using Thunder Client

### Concepts Learned
- Secure Login
- Password Verification
- bcrypt.compare()
- Hashed Password Authentication

### Authentication Status
- ✅ Register API
- ✅ Secure Login API
- ⏳ JWT Authentication (Next)

- ## ✅ Day 19 - JWT Authentication

### Completed
- Installed jsonwebtoken package
- Configured JWT Secret
- Generated JWT after successful login
- Returned JWT token to client
- Tested JWT authentication using Thunder Client

### Concepts Learned
- JWT (JSON Web Token)
- Authentication Token
- JWT Secret
- jwt.sign()
- Token-Based Authentication

### Authentication Status
- ✅ User Registration
- ✅ Secure Login (bcrypt)
- ✅ JWT Token Generation
- ⏳ Protected Routes (Next)

## ✅ Day 20 - Protected APIs using JWT Middleware

### Completed
- Created Authentication Middleware
- Implemented JWT Verification
- Protected Student CRUD APIs
- Added Bearer Token Authentication
- Tested Authorized and Unauthorized Requests

### Concepts Learned
- Middleware
- Authorization Header
- Bearer Token
- JWT Verification
- Protected Routes

## ✅ Day 21 - Role Based Access Control (RBAC)

### Completed
- Implemented Role Middleware
- Protected Student APIs based on user roles
- Tested ADMIN, FACULTY and STUDENT access
- Implemented 401 Unauthorized and 403 Forbidden responses

### Concepts Learned
- Authorization
- RBAC
- Role Middleware
- 401 Unauthorized
- 403 Forbidden
- 
## ✅ Day 22 - Request Validation

### Completed
- Installed express-validator
- Created validation middleware
- Validated Register API
- Returned 400 Bad Request for invalid input
- Tested valid and invalid requests

### Concepts Learned
- Request Validation
- Validation Middleware
- express-validator
- validationResult()
- 400 Bad Request
## ✅ Day 23 - Faculty Management Module

### Completed
✅ Completed Tasks
-Created Faculty Service Layer
-Created Faculty Controller
-Created Faculty Routes
-Implemented Faculty CRUD Operations
-Protected Faculty APIs using JWT Authentication
-Implemented Role-Based Authorization
-ADMIN can Create, Update and Delete Faculty
-ADMIN and FACULTY can View Faculty Details
-Tested all Faculty APIs successfully using Thunder Client
-Verified Prisma Relations between Users, Faculty and Departments


##  ✅ Day 24 – Department Management Module

### 🎯 Objective

Implemented the complete Department Management Module with secure role-based access using JWT Authentication and Authorization.

### ✅ Completed Tasks

* Created Department Service Layer
* Created Department Controller
* Created Department Routes
* Implemented Department CRUD Operations
* Protected Department APIs using JWT Authentication
* Implemented Role-Based Authorization
* ADMIN can Create, Update and Delete Departments
* ADMIN, FACULTY and STUDENT can View Department Details
* Tested all Department APIs successfully using Thunder Client
* Verified Prisma Integration with Departments Table

### 📌 APIs Implemented

#### Department APIs

* GET /departments
* GET /departments/:id
* POST /departments
* PUT /departments/:id
* DELETE /departments/:id

### 🔐 Security Implemented

* JWT Authentication Middleware
* Role-Based Authorization Middleware
* Protected Department Routes

### 🧪 Testing

Successfully tested:

* View All Departments
* View Single Department
* Create Department
* Update Department
* Delete Department

### 📊 Status

✅ Department Management Module Completed Successfully

## 📅 Day 25 - Attendance Management Module

### ✅ Completed Features

- Created Attendance Module
- Implemented Attendance CRUD APIs
- Connected Attendance with Students and Faculty
- Integrated Prisma ORM
- Protected APIs using JWT Authentication
- Implemented Role-Based Authorization
- Successfully tested all Attendance APIs using Thunder Client

### Attendance APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /attendance | Get all attendance records |
| GET | /attendance/:id | Get attendance by ID |
| POST | /attendance | Create attendance record |
| PUT | /attendance/:id | Update attendance |
| DELETE | /attendance/:id | Delete attendance |

### Relationships

- Attendance → Student (Many-to-One)
- Attendance → Faculty (Many-to-One)

### Status

✅ Attendance Module Completed

## 📅 Day 26 - Subject Management Module

### ✅ Completed Features

- Created Subjects Database Table
- Connected Subjects with Departments
- Added Prisma ORM Model
- Implemented Subject CRUD APIs
- Protected APIs using JWT Authentication
- Implemented Role-Based Authorization
- Successfully Tested Subject APIs using Thunder Client

### APIs Implemented

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /subjects | Get all subjects |
| GET | /subjects/:id | Get subject by ID |
| POST | /subjects | Create subject |
| PUT | /subjects/:id | Update subject |
| DELETE | /subjects/:id | Delete subject |

### Relationships

## 📅 Day 27 - Course Management Module

### ✅ Completed Features

- Created Courses Database Table
- Connected Courses with Departments
- Added Prisma ORM Model
- Implemented Course CRUD APIs
- Protected APIs using JWT Authentication
- Implemented Role-Based Authorization
- Successfully Tested Course APIs using Thunder Client

### APIs Implemented

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /courses | Get all courses |
| GET | /courses/:id | Get course by ID |
| POST | /courses | Create course |
| PUT | /courses/:id | Update course |
| DELETE | /courses/:id | Delete course |

### Relationships

Course (1) ------> (Many) Departments

### Status

✅ Course Management Module Completed

Department (1) ------> (Many) Subjects

### Status

✅ Subject Management Module Completed

# 📅 Day 28 - Timetable Management Module Completed

## ✅ Work Completed

Today I implemented the complete **Timetable Management Module** for the College AI Assistant backend.

### Database

- Created `timetable` table
- Added foreign key relationship with:
  - Subjects
  - Faculty
  - Departments

### Prisma

- Updated Prisma schema using `prisma db pull`
- Generated latest Prisma Client

### Backend

Implemented complete CRUD APIs:

- Get All Timetable
- Get Timetable By ID
- Create Timetable
- Update Timetable
- Delete Timetable

### Routes

Added new routes:

```
/timetable
```

### Security

Implemented Role Based Access Control:

- ADMIN
  - Create Timetable
  - Update Timetable
  - Delete Timetable

- FACULTY
  - View Timetable

- STUDENT
  - View Timetable

### API Testing

Successfully tested using Thunder Client:

- Login
- Create Timetable
- Get All Timetable
- Get Timetable By ID
- Update Timetable
- Delete Timetable

### Learning Outcome

Today I learned:

- Managing relational data using Prisma
- Working with multiple foreign keys
- Handling TIME fields in Prisma
- Building complete CRUD APIs
- Testing secured APIs using JWT Authentication
- Debugging Prisma DateTime and TIME conversion issues


## ✅ Day 29 Completed

### Examination Management Module

Completed:

- Examination Table
- Prisma Examination Model
- Examination Service
- Examination Controller
- Examination Routes
- API Integration
- CRUD Operations
- Thunder Client Testing

Status:
- Completed Successfully

---

## ✅ Day 30 Completed

### Results Management Module

Completed:

- Results Table
- Prisma Results Model
- Results Service
- Results Controller
- Results Routes
- API Integration
- CRUD Operations
- Student, Subject & Examination Relationships
- Thunder Client Testing

Status:
- Completed Successfully
