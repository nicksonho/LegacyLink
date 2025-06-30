# LegacyLink

LegacyLink is a mentorship matching platform designed to connect NUS students with alumni in the startup ecosystem. We aim to foster meaningful connections, career insights, and opportunities for collaboration between students and experienced alumni through a mobile-first, intuitive platform.
For Detailed README (google docs with images) : https://docs.google.com/document/d/1bDvqHsqvOm-vwLtHGWDkfbI0dcSnkDfRGNu9l8l2gFA/edit?tab=t.0

---

## Level of Achievement

**Target:** Artemis  
By Milestone 3, we aim to complete all core features, including real-time chat, mentor matching, and secure API integrations with a seamless user experience.

---

## Project Scope

### One-sentence description
A mentorship app connecting NUS students with startup-experienced alumni through curated profiles and real-time chat.

### Detailed description
LegacyLink addresses the challenge of discovering relevant alumni mentors by providing a dedicated mobile-first platform. Students can register, browse curated mentor profiles, and initiate chats with mentors whose startup experience aligns with their interests. The platform prioritizes speed, scalability, and security using a modern tech stack.

---

## Milestone 1 (Completed)

### Problem Motivation
Students often struggle to connect with alumni in emerging sectors like startups. Traditional alumni directories are static and not optimized for direct conversations. LegacyLink creates a dedicated platform for startup-minded students to find and communicate with mentors effectively.

### Features Implemented
- Clerk authentication system (frontend complete, backend in progress)
- RESTful API with CRUD operations:
  - User registration, login, and management
  - Mentor CRUD endpoints
  - Notifications, messages, and request endpoints
- MongoDB integration for persistent data storage
- Project modularization (`/routes`, `/controllers`, `/models`)
- Expo frontend with working sign-in/sign-up UI using Clerk
- Basic navigation setup using React Navigation

---

## Challenges Encountered
- Aligning frontend and backend for Clerk JWT handling
- Delays in implementing Socket.io due to token-based authentication
- Ongoing refinement of frontend-backend integration and Postman testing

---

## Milestone 2 Preview

- Full chat system with Socket.io (pending Debugging)
- Clerk-secured backend APIs
- Mentor directory with filters
- User profile display
- Interest-based request matching
- Core features completed and tested
- End-to-end testing and deployment preparation

---

## Tech Stack

- **Frontend:** React Native (Expo)
- **Backend:** Node.js with Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** Clerk
- **Planned Hosting:** Vercel (frontend), Render or Railway (backend)

---

## Documentation

For detailed project logs, updates, and testing notes:  
[📄 Project Log (Google Docs)](https://docs.google.com/document/d/1w3JyvZ519LBYqc6Tig7Nn5eUTiExlMnynMNyqhqUU_k/edit?tab=t.0)

---

## Team

| Name    | Role          | Responsibilities                            |
|---------|---------------|---------------------------------------------|
| Declan  | Backend Lead  | API development, MongoDB models, Express   |
| Nickson | Frontend Lead | Expo setup, Clerk integration, UI/UX       |
| Both    | Full-Stack    | Integration, testing, planning, documentation |

---

## Repository

[GitHub - LegacyLink](https://github.com/nicksonho/LegacyLink)

---
