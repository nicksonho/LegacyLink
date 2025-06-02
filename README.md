# LegacyLink

LegacyLink is a mentorship matching platform designed to connect NUS students with alumni in the startup ecosystem. Our mission is to foster meaningful connections, career insights, and opportunities for collaboration between students and experienced alumni.

---

## Level of Achievement

Artemis (Target)  
We aim to complete core features with a seamless user experience by the end of Milestone 3, including real-time chat, mentor matching, and protected API integration.

---

## Project Scope

### One-sentence version:
A mentorship app connecting NUS students with startup-experienced alumni through curated profiles and chat functionality.

### Descriptive version:
LegacyLink addresses the challenge of discovering relevant alumni mentors by providing a dedicated mobile-first platform. Students can register, browse curated mentor profiles, and initiate real-time chats with mentors whose startup experience aligns with their interests. The platform is designed to be intuitive, fast, and scalable using modern tech stacks and secure authentication.

---

## Milestone 1 (Ideation)

### Problem Motivation
Students often struggle to connect with alumni in niche or emerging sectors like startups. Traditional alumni directories are static and not optimized for fast, real-time conversations. There is a need for a dedicated, modern platform where startup-minded students can find mentors and communicate with them directly.

### Proposed Core Features
- Clerk authentication system
- Student and mentor registration and profile viewing
- RESTful API with CRUD operations
- Messaging system for student-mentor interaction
- Mobile-first frontend using React Native

### Design & Plan
- Frontend: React Native using Expo
- Backend: Node.js with Express
- Database: MongoDB (via Mongoose)
- Authentication: Clerk (frontend complete, backend in progress)
- Hosting (Planned): Vercel (frontend), Render or Railway (backend)
- Project Repository: [GitHub - LegacyLink](https://github.com/nicksonho/LegacyLink)

---

## Core Features Implemented (Milestone 1)

- Backend API endpoints for:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/users, POST, PUT, DELETE
  - GET /api/mentors, POST, PUT, DELETE
- MongoDB integration for persistent data storage
- Seed script for user data
- Project is modularized into /routes, /controllers, /models
- Expo frontend with working sign-in and sign-up UI using Clerk
- Basic navigation setup (React Navigation)

---

## Known Challenges

- Misalignment between frontend and backend on Clerk token handling (currently resolving)
- Delay in setting up Socket.io for real-time messaging due to token-based auth
- Need for more frontend-backend communication testing in Postman and Expo

---

## Milestone 2 Preview

- Implement full chat system with Socket.io
- Secure backend APIs with Clerk token verification
- Create Mentor Directory with filters
- Display logged-in user profiles
- Add request-matching functionality based on interests

---

## Additional Notes

- Each team member is tracking time and contributions in the Project Log.
- We aim to meet or exceed the required 140 hours per member.

---

## Team

| Name          | Role            | Responsibilities |
|---------------|------------------|-------------------|
| Declan        | Backend Lead     | API endpoints, MongoDB models, Express setup |
| Nickson       | Frontend Lead    | Expo setup, Clerk integration, screen layout |
| Both          | Full-Stack Support | Integration, planning, documentation |

---
