-- ======================================
-- College AI Assistant Database Schema
-- Author: Madhu Yadhav
-- Version: 1.0
-- ======================================

CREATE DATABASE IF NOT EXISTS college_ai_assistant;

USE college_ai_assistant;

-- ===========================================
-- USERS TABLE
-- ===========================================

CREATE TABLE users (

    user_id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    role ENUM('ADMIN','FACULTY','STUDENT') NOT NULL,

    phone VARCHAR(15),

    profile_image VARCHAR(255),

    is_active BOOLEAN DEFAULT TRUE,

    last_login TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

-- ===========================================
-- STUDENTS TABLE
-- Stores student academic details
-- ===========================================

CREATE TABLE students (

    student_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    roll_number VARCHAR(30) NOT NULL UNIQUE,

    admission_number VARCHAR(30) UNIQUE,

    department VARCHAR(100) NOT NULL,

    year INT NOT NULL,

    semester INT NOT NULL,

    section VARCHAR(10),

    gender VARCHAR(10),

    date_of_birth DATE,

    address TEXT,

    parent_name VARCHAR(100),

    parent_phone VARCHAR(15),

    blood_group VARCHAR(5),

    admission_date DATE,

    status ENUM('ACTIVE','GRADUATED','SUSPENDED')
        DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)

);

-- ===========================================
-- DEPARTMENTS TABLE
-- ===========================================

CREATE TABLE departments (

    department_id INT AUTO_INCREMENT PRIMARY KEY,

    department_name VARCHAR(100) NOT NULL UNIQUE,

    department_code VARCHAR(20) NOT NULL UNIQUE,

    hod_name VARCHAR(100),

    email VARCHAR(100),

    phone VARCHAR(15),

    building_name VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

-- ===========================================
-- FACULTY TABLE
-- ===========================================

CREATE TABLE faculty (

    faculty_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    employee_id VARCHAR(30) NOT NULL UNIQUE,

    department VARCHAR(100) NOT NULL,

    designation VARCHAR(100),

    qualification VARCHAR(100),

    experience INT,

    joining_date DATE,

    office_phone VARCHAR(15),

    status ENUM('ACTIVE','INACTIVE')
        DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)

);

-- ==================================
-- ALTERING THE STUDENT TABLE
-- ==================================
ALTER TABLE students
ADD COLUMN department_id INT;

-- ==============================================================================
-- ADDING FOREIGN KEY TO THE STUDENT TABLE 
-- ADD CONSTRAINT:ADD A NEW RULE TO THIS TABLE FOLLOWED WITH THE CONSTRAINT NAME
-- ==============================================================================
ALTER TABLE students
ADD CONSTRAINT fk_student_department
FOREIGN KEY(department_id)
REFERENCES departments(department_id);

-- =========================================
-- ALTERING THE FACULTY TABLE
-- =========================================
ALTER TABLE faculty
ADD COLUMN department_id INT;

-- ==========================================
-- ADDING FOREIGN KEY TO THE FACULTY TABLE
-- ==========================================
ALTER TABLE faculty
ADD CONSTRAINT fk_faculty_department
FOREIGN KEY(department_id)
REFERENCES departments(department_id);

-- ============================================
--  ATTENDANCE TABLE
-- ============================================

CREATE TABLE attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT NOT NULL,

    faculty_id INT NOT NULL,

    attendance_date DATE NOT NULL,

    status ENUM('PRESENT','ABSENT','LATE') DEFAULT 'PRESENT',

    remarks VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_attendance_student
        FOREIGN KEY(student_id)
        REFERENCES students(student_id),

    CONSTRAINT fk_attendance_faculty
        FOREIGN KEY(faculty_id)
        REFERENCES faculty(faculty_id)
);