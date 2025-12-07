# Lab Test One: Full-Stack CRUD Application

**Course:** Advanced Object-Oriented Programming  
**Duration:** 1 hour  
**Total Marks:** 10

---

## 📋 Overview

In this lab test, you will create a full-stack application demonstrating CRUD (Create, Read, Update, Delete) operations using **your own creative idea**. The application consists of:

1. **GitHub Codespaces Configuration** - Automated development environment setup
2. **Frontend** - React with TypeScript for the user interface
3. **Backend** - Spring Boot REST API for data management

---

## 🎯 Learning Objectives

By completing this lab test, you will demonstrate your ability to:

- Configure a complete development environment using GitHub Codespaces
- Build a React TypeScript frontend application
- Implement a Spring Boot REST API with full CRUD operations
- Integrate frontend and backend components
- Apply Object-Oriented Programming principles

---

## 📝 Requirements

### Part 1: GitHub Codespaces Configuration

Configure the development environment to automatically set up all required tools and dependencies.

**Deliverables:**
- Development environment configuration that installs all necessary tools
- Environment ready to run both frontend and backend applications

---

### Part 2: Backend - Spring Boot REST API

Create a backend application with REST API endpoints.

**Deliverables:**
- REST API with the following HTTP methods:
  - GET (retrieve all resources)
  - GET (retrieve single resource by ID)
  - POST (create new resource)
  - PUT (update entire resource)
  - PATCH (partially update resource)
  - DELETE (remove resource)
- All endpoints must be functional

---

### Part 3: Frontend - React TypeScript Application

Create a frontend application with user interface.

**Deliverables:**
- User interface displaying all resources
- Form for creating and updating resources
- Functionality to delete resources
- Complete integration with backend API

---

## 🚀 Getting Started

### Step 1: Fork This Repository
1. Click the "Fork" button at the top right of this repository
2. Clone your forked repository to your local machine or open it in GitHub Codespaces

### Step 2: Open in GitHub Codespaces
1. Click on "Code" → "Codespaces" → "Create codespace on main"
2. Wait for the environment to initialize

### Step 3: Implement Your Application
Follow the requirements to build your application.

## 🏃 Running the app (local / Codespaces)

Quick commands to run both services and verify the CRUD flow locally:

1. Start both services (backend + frontend):

```bash
# from repository root
make dev
```

2. Stop services:

```bash
make stop
```

3. View logs:

```bash
make logs
```

4. Run the automated E2E test (Playwright):

```bash
make e2e
```

Notes:
- The start script writes logs to `logs/backend.log` and `logs/frontend.log`.
- If you run inside GitHub Codespaces, open forwarded ports `8080` and `5173` to view the backend and frontend respectively.

---

## 📂 Expected Project Structure

```
advance-oop-tests/
├── .devcontainer/
│   └── devcontainer.json
├── backend/
│   └── (Spring Boot application files)
├── frontend/
│   └── (React TypeScript application files)
├── README.md
└── LAB_TEST_ONE.md
```

---

## ✅ Submission Guidelines

1. **Commit your code** to your forked repository
2. **Push all changes** to GitHub
3. **Share the repository link** with your instructor
4. **Demonstrate your working application** to the instructor

### Submission Checklist:
- [ ] Development environment configured
- [ ] Backend with all REST endpoints functional
- [ ] Frontend with complete CRUD UI functional
- [ ] Both applications run without errors
- [ ] All CRUD operations work correctly

---

## 📊 Grading Rubric

This lab test is worth **10 marks** total. Your work will be evaluated based on:

- GitHub Codespaces configuration completeness
- Backend REST API functionality (all HTTP methods working)
- Frontend UI implementation and backend integration
- Overall application functionality