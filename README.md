# LegacyLink

LegacyLink is a mentorship matching platform designed to connect NUS students with alumni who are working in startups. Our goal is to foster meaningful connections, knowledge-sharing, and opportunities for collaboration beyond graduation.

---

## Level of Achievement

**Apollo (Planned)**  
We aim to hit the Apollo level by MS3 with full real-time messaging, intelligent matching, and profile customization.

---

## Project Scope

### One-liner:
A mentorship platform connecting NUS students to alumni from the startup ecosystem.

### Longer Description:
LegacyLink is a mobile-first mentorship application that helps NUS students find and connect with startup alumni based on shared interests and career paths. It supports user registration, mentor directory browsing, real-time messaging, and profile management. Our solution is optimized for meaningful interactions, minimal friction, and smooth integration with modern authentication.

---

## Milestone 1 (Ideation)

### Problem Motivation
Students often lack easy access to alumni who can provide insight into niche industries, especially startups. Traditional alumni portals are often outdated, hard to navigate, or too broad in scope.

### Proposed Core Features
- Clerk-based authentication
- Basic user/mentor CRUD operations
- RESTful backend API with Express + MongoDB
- Mobile app with:
  - Mentor directory
  - Profile display
  - Messaging system (under development)

### Design & Plan
- Frontend: React Native
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Authentication: Clerk
- Hosting (Planned): Vercel (frontend), Railway or Render (backend)
- Repositories: [LegacyLink GitHub](https://github.com/nicksonho/LegacyLink)

---

## Core Features Implemented (MS1)
- Backend APIs for:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/users`, `POST`, `PUT`, `DELETE`
  - `GET /api/mentors`, `POST`, `PUT`, `DELETE`
- MongoDB database integration
- Seed script for test users
- Clerk authentication (frontend setup)
- Project structure complete for full-stack dev
- Documentation of API endpoints in progress

---

## Known Challenges
- Miscommunication between frontend/backend on Clerk integration (currently fixing token pass-through and protected route setup)
- Delays in real-time chat implementation due to Socket.io integration complexities
- Learning curve for integrating Clerk backend token verification

---

## Milestone 2 Preview
- Working real-time messaging system with Socket.io
- Fully styled mobile screens: Home, Chat, Profile
- Improved matching algorithm (using keyword/interest matching)
- Protected routes with Clerk token verification

---

---

## Team

| Name          | Role            | Tasks |
|---------------|------------------|-------|
| Declan        | Backend Lead     | API routes, MongoDB models, authController |
| Nickson       | Frontend Lead    | React Native UI, Clerk Auth |
| Both          | Full-stack Dev   | UI integration, testing, planning |

---

