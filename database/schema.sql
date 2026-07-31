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

-- ===========================================
-- SUBJECTS TABLE REATED TO DEPARTMENT TABLE
-- ===========================================

CREATE TABLE subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,

    subject_name VARCHAR(100) NOT NULL,

    subject_code VARCHAR(20) UNIQUE NOT NULL,

    department_id INT NOT NULL,

    semester INT NOT NULL,

    year INT NOT NULL,

    credits INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_subject_department
    FOREIGN KEY (department_id)
    REFERENCES departments(department_id)
);

-- ==========================================
-- COURSES TABLE (Ex:B-Tech ,MBA, Medical)
-- ==========================================

CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,

    course_name VARCHAR(100) NOT NULL,

    course_code VARCHAR(20) UNIQUE NOT NULL,

    duration_years INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

-- ========================================
-- TIME TABLE TABLE
-- =========================================

CREATE TABLE timetable (
    timetable_id INT AUTO_INCREMENT PRIMARY KEY,

    subject_id INT NOT NULL,

    faculty_id INT NOT NULL,

    department_id INT NOT NULL,

    day_of_week ENUM(
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ) NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    room_number VARCHAR(20),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (subject_id)
    REFERENCES subjects(subject_id),

    FOREIGN KEY (faculty_id)
    REFERENCES faculty(faculty_id),

    FOREIGN KEY (department_id)
    REFERENCES departments(department_id)
);

-- =================================================
-- EXAMINATION TABLE (MID-1,MID-2, SEMESTER AND LAB)
-- =================================================

CREATE TABLE examinations (

    exam_id INT AUTO_INCREMENT PRIMARY KEY,

    subject_id INT NOT NULL,

    exam_name VARCHAR(100) NOT NULL,

    exam_type ENUM(
        'MID1',
        'MID2',
        'SEMESTER',
        'LAB',
        'PRACTICAL'
    ) NOT NULL,

    exam_date DATE NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    venue VARCHAR(100),

    total_marks INT DEFAULT 100,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY(subject_id)
    REFERENCES subjects(subject_id)

);

-- ==========================================
-- RESULTS TABLE
-- ==========================================
CREATE TABLE results (
    result_id INT PRIMARY KEY AUTO_INCREMENT,

    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    exam_id INT NOT NULL,

    marks_obtained DECIMAL(5,2) NOT NULL,
    grade VARCHAR(5),
    result_status ENUM('PASS','FAIL') DEFAULT 'PASS',
    remarks VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_result_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id),

    CONSTRAINT fk_result_subject
        FOREIGN KEY (subject_id)
        REFERENCES subjects(subject_id),

    CONSTRAINT fk_result_exam
        FOREIGN KEY (exam_id)
        REFERENCES examinations(exam_id)
);

-- ============================================
-- FEES TABLE
-- ============================================

CREATE TABLE fees (
    fee_id INT PRIMARY KEY AUTO_INCREMENT,

    student_id INT NOT NULL,

    academic_year VARCHAR(20) NOT NULL,
    semester INT NOT NULL,

    total_fee DECIMAL(10,2) NOT NULL,
    amount_paid DECIMAL(10,2) DEFAULT 0,
    balance DECIMAL(10,2) NOT NULL,

    due_date DATE,
    payment_status ENUM('PENDING','PARTIAL','PAID') DEFAULT 'PENDING',

    remarks VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_fee_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id)
);

-- ===============================================
-- NOTICES TABLE
-- ===============================================

CREATE TABLE notices (

    notice_id INT PRIMARY KEY AUTO_INCREMENT,

    title VARCHAR(150) NOT NULL,

    description TEXT NOT NULL,

    audience ENUM(
        'ALL',
        'STUDENT',
        'FACULTY'
    ) DEFAULT 'ALL',

    priority ENUM(
        'LOW',
        'MEDIUM',
        'HIGH'
    ) DEFAULT 'MEDIUM',

    publish_date DATE NOT NULL,

    expiry_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

-- ===============================================
-- ASSIGNMENTS TABLE
-- ===============================================

CREATE TABLE assignments (

    assignment_id INT PRIMARY KEY AUTO_INCREMENT,

    subject_id INT NOT NULL,

    faculty_id INT NOT NULL,

    title VARCHAR(150) NOT NULL,

    description TEXT,

    due_date DATE NOT NULL,

    max_marks INT DEFAULT 100,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_assignment_subject
        FOREIGN KEY(subject_id)
        REFERENCES subjects(subject_id),

    CONSTRAINT fk_assignment_faculty
        FOREIGN KEY(faculty_id)
        REFERENCES faculty(faculty_id)

);

-- ==============================================
-- ASSIGNMENT SUBMISSIONS TABLE
-- ==============================================

CREATE TABLE assignment_submissions (

    submission_id INT PRIMARY KEY AUTO_INCREMENT,

    assignment_id INT NOT NULL,

    student_id INT NOT NULL,

    submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    file_url VARCHAR(255),

    remarks VARCHAR(255),

    marks_obtained DECIMAL(5,2),

    status ENUM(
        'SUBMITTED',
        'EVALUATED',
        'LATE'
    ) DEFAULT 'SUBMITTED',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_submission_assignment
        FOREIGN KEY (assignment_id)
        REFERENCES assignments(assignment_id),

    CONSTRAINT fk_submission_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id)

);

-- ================================================
-- LEAVE REQUEST TABLES
-- ================================================

CREATE TABLE leave_requests (

    leave_id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    leave_type ENUM(
        'SICK',
        'CASUAL',
        'EMERGENCY',
        'OTHER'
    ) NOT NULL,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    reason VARCHAR(255),

    status ENUM(
        'PENDING',
        'APPROVED',
        'REJECTED'
    ) DEFAULT 'PENDING',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_leave_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)

);

-- ===========================================
-- EVENTS TABLES
-- ===========================================

CREATE TABLE events (

    event_id INT PRIMARY KEY AUTO_INCREMENT,

    event_title VARCHAR(150) NOT NULL,

    event_type ENUM(
        'WORKSHOP',
        'SEMINAR',
        'HACKATHON',
        'SPORTS',
        'CULTURAL',
        'PLACEMENT',
        'OTHER'
    ) NOT NULL,

    description TEXT,

    event_date DATE NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    venue VARCHAR(100),

    organizer VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

-- ===============================================
-- LIBRARY BOOKS TABLE
-- ===============================================

CREATE TABLE library_books (

    book_id INT PRIMARY KEY AUTO_INCREMENT,

    book_title VARCHAR(200) NOT NULL,

    author VARCHAR(150) NOT NULL,

    isbn VARCHAR(30) UNIQUE,

    category VARCHAR(100),

    publisher VARCHAR(150),

    publication_year INT,

    total_copies INT NOT NULL,

    available_copies INT NOT NULL,

    shelf_location VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

-- ================================================
-- LIBRARY ISSUES LIKE (ISSUED ,RETURNED,OVERDUE )
-- ================================================

CREATE TABLE library_issues (

    issue_id INT PRIMARY KEY AUTO_INCREMENT,

    book_id INT NOT NULL,

    student_id INT NOT NULL,

    issue_date DATE NOT NULL,

    due_date DATE NOT NULL,

    return_date DATE NULL,

    status ENUM(
        'ISSUED',
        'RETURNED',
        'OVERDUE'
    ) DEFAULT 'ISSUED',

    fine_amount DECIMAL(8,2) DEFAULT 0.00,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_issue_book
        FOREIGN KEY(book_id)
        REFERENCES library_books(book_id),

    CONSTRAINT fk_issue_student
        FOREIGN KEY(student_id)
        REFERENCES students(student_id)

);

-- ===============================================
-- PLACEMENTS TABLE
-- ===============================================
CREATE TABLE placements (

    placement_id INT PRIMARY KEY AUTO_INCREMENT,

    company_name VARCHAR(150) NOT NULL,

    job_role VARCHAR(100) NOT NULL,

    eligibility VARCHAR(100),

    ctc DECIMAL(10,2),

    job_location VARCHAR(100),

    drive_date DATE,

    application_deadline DATE,

    description TEXT,

    status ENUM(
        'OPEN',
        'CLOSED'
    ) DEFAULT 'OPEN',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

-- ================================================
-- PLACEMENT APPLICATIONS TABLE
-- ================================================

CREATE TABLE placement_applications (

    application_id INT PRIMARY KEY AUTO_INCREMENT,

    placement_id INT NOT NULL,

    student_id INT NOT NULL,

    resume_url VARCHAR(255),

    applied_date DATE NOT NULL,

    status ENUM(
        'APPLIED',
        'SHORTLISTED',
        'SELECTED',
        'REJECTED'
    ) DEFAULT 'APPLIED',

    remarks VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_application_placement
        FOREIGN KEY (placement_id)
        REFERENCES placements(placement_id),

    CONSTRAINT fk_application_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id)

);

-- =========================================
-- HOSTELS TABLE
-- =========================================

CREATE TABLE hostel_rooms (

    room_id INT PRIMARY KEY AUTO_INCREMENT,

    room_number VARCHAR(20) NOT NULL,

    hostel_name VARCHAR(100) NOT NULL,

    room_type ENUM(
        'SINGLE',
        'DOUBLE',
        'TRIPLE',
        'FOUR_SHARING'
    ) NOT NULL,

    capacity INT NOT NULL,

    occupied INT DEFAULT 0,

    floor_no INT,

    status ENUM(
        'AVAILABLE',
        'FULL',
        'MAINTENANCE'
    ) DEFAULT 'AVAILABLE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

-- ==============================================
-- TRANSPORTATION TABLE
-- ==============================================

CREATE TABLE transport_buses (

    bus_id INT PRIMARY KEY AUTO_INCREMENT,

    bus_number VARCHAR(30) NOT NULL UNIQUE,

    route_name VARCHAR(100) NOT NULL,

    driver_name VARCHAR(100) NOT NULL,

    driver_phone VARCHAR(15),

    capacity INT NOT NULL,

    available_seats INT NOT NULL,

    status ENUM(
        'ACTIVE',
        'INACTIVE',
        'MAINTENANCE'
    ) DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

-- =============================================
-- FEEDBACK TABLE
-- =============================================

CREATE TABLE feedback (

    feedback_id INT PRIMARY KEY AUTO_INCREMENT,

    student_id INT NOT NULL,

    feedback_type ENUM(
        'FACULTY',
        'COURSE',
        'HOSTEL',
        'TRANSPORT',
        'GENERAL'
    ) NOT NULL,

    subject VARCHAR(150) NOT NULL,

    message TEXT NOT NULL,

    rating INT,

    status ENUM(
        'PENDING',
        'REVIEWED',
        'RESOLVED'
    ) DEFAULT 'PENDING',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_feedback_student
        FOREIGN KEY(student_id)
        REFERENCES students(student_id)

);