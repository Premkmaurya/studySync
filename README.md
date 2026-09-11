# StudySync

StudySync is a collaborative learning platform built for students to create and organize study groups, write and share notes, communicate in real time, and use an AI study assistant while learning.

The project is a full-stack application with a React/Vite frontend and an Express/MongoDB backend. It also includes Redis caching, Socket.IO real-time communication, ImageKit image storage, Google OAuth, and client-side end-to-end encryption for group chat messages.

## Features

### 👥 Study Groups

- Create study groups with a name, description, field, and optional image
- Discover and search groups
- Join groups and view group members
- See groups you created and groups you have joined
- Get group suggestions based on the fields of groups you already joined
- Group owners can update groups, remove members, and delete groups

### 📝 Notes

- Create notes inside study groups
- Rich-text note editing
- Browse the latest notes
- Search notes by text, group, or field
- View your own notes
- Save and unsave notes for later
- Browse saved notes

### 🤖 Syncie — AI Study Assistant

StudySync includes an AI assistant named **Syncie**, powered by Google Gemini.

Syncie supports two main workflows:

- **AI note generation:** turn a topic or prompt into structured study notes
- **Note-based conversations:** ask questions about a specific note, with the assistant instructed to use the note content as its knowledge source

AI interactions are handled through Socket.IO and stored as AI chat history.

### 💬 Real-Time Group Chat

- Real-time group messaging with Socket.IO
- Authenticated socket connections using the application's JWT cookie
- Group membership verification before joining a chat room
- Persistent message history in MongoDB
- Real-time message broadcasting to group members

### 🔐 End-to-End Encrypted Chat

The frontend contains a dedicated cryptography layer for group chat encryption.

- User key-pair initialization and local key storage
- RSA-OAEP public-key handling
- Group-key envelopes for individual members
- Group key versions for key rotation
- Messages can be sent as ciphertext with an IV and key version
- The Socket.IO server persists and broadcasts encrypted payloads without decrypting the message content

> Encryption is implemented at the application level. Review the cryptographic implementation and threat model before treating it as a security guarantee for production use.

### 🔑 Authentication

- Email/password registration and login
- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only authentication cookie
- Optional persistent login through `rememberMe`
- Google OAuth 2.0 login
- Profile information and profile-picture updates

### ⚡ Performance and UX

- Redis-backed response caching
- Cache invalidation after data changes
- MongoDB text search for groups and notes
- Pagination support for group and note listings
- React lazy loading and route-level `Suspense`
- Loading skeletons for major dashboard and group views
- Responsive group navigation
- Light/dark theme support
- Animated UI using GSAP and Framer Motion

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Redux Toolkit
- TanStack React Query
- Axios
- Tailwind CSS
- Mantine
- Tiptap
- Framer Motion
- GSAP
- Socket.IO Client
- React Hook Form
- React Markdown

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- Redis
- Socket.IO
- JWT
- bcryptjs
- Passport / Google OAuth 2.0
- Google Gemini API
- ImageKit
- Multer
- Express Validator
- Compression
- Morgan

## Architecture

```text
StudySync
│
├── frontend/                 # React + Vite client
│   └── src/
│       ├── app/              # Redux store
│       ├── components/       # Shared and feature UI
│       ├── features/         # Redux feature modules
│       │   ├── auth/
│       │   ├── chat/
│       │   ├── groups/
│       │   ├── messages/
│       │   ├── notes/
│       │   └── theme/
│       ├── pages/            # Application pages
│       ├── routes/            # React Router configuration
│       ├── services/          # API, Socket.IO and crypto services
│       │   └── crypto/        # E2EE implementation
│       └── App.jsx
│
└── backend/                  # Express API and Socket.IO server
    ├── src/
    │   ├── config/            # Environment configuration
    │   ├── controllers/       # Request handlers
    │   ├── db/                # MongoDB connection
    │   ├── middlewares/       # Auth, validation, uploads and errors
    │   ├── models/            # Mongoose models
    │   ├── routes/             # REST API routes
    │   ├── services/           # AI, cache and image services
    │   ├── sockets/            # Socket.IO server and events
    │   └── utils/              # Shared utilities
    └── server.js              # Backend entry point
```

## Application Flow

```text
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      Vite           │
                    └──────────┬──────────┘
                               │
                  REST / Axios │ Socket.IO
                               │
              ┌────────────────┴────────────────┐
              │                                 │
      ┌───────▼────────┐               ┌────────▼────────┐
      │ Express API    │               │ Socket.IO Server│
      │ JWT Auth       │               │ Real-time Chat  │
      └───────┬────────┘               │ AI Events       │
              │                        └────────┬────────┘
              │                                 │
       ┌──────▼──────┐                          │
       │   MongoDB   │◄─────────────────────────┘
       │  Mongoose   │
       └─────────────┘
              │
       ┌──────▼──────┐
       │    Redis    │
       │    Cache    │
       └─────────────┘

External services:
- Google Gemini → AI generation
- ImageKit → image storage
- Google OAuth → authentication
```

## Main Routes

### Public

- `/` — Landing page
- `/about` — About StudySync
- `/features` — Feature overview
- `/contact` — Contact page
- `/login` — Login
- `/register` — Registration

### Dashboard

- `/dashboard/home` — Dashboard overview
- `/dashboard/find-groups` — Discover and search groups
- `/dashboard/create-group` — Create a study group
- `/dashboard/notes` — Saved notes
- `/dashboard/profile` — User profile

### Group Workspace

- `/group/:groupId` — Group notes
- `/group/:groupId/chats` — Real-time group chat
- `/group/:groupId/members` — Group members
- `/group/:groupId/note` — Note editor
- `/group/:groupId/settings` — Group settings

## Data Models

The backend currently contains models for:

- Users
- Groups
- Group memberships
- Group chat messages
- Group encryption keys/envelopes
- Notes
- Saved notes
- AI messages

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js 18+
- MongoDB
- Redis
- A Google Gemini API key
- An ImageKit account if image uploads are required
- Google OAuth credentials if Google login is required

### 1. Clone the repository

```bash
git clone https://github.com/Premkmaurya/studySync.git
cd studySync
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
NODE_ENV=development
PORT=5000

MONGODB_URI=mongodb://localhost:27017/studysync
JWT_SECRET_KEY=your_secure_jwt_secret
REDIS_URL=redis://localhost:6379

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

GEMINI_API_KEY=your_gemini_api_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The API defaults to `http://localhost:5000`.

### 3. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

For a local backend, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The Vite development server runs on the default Vite port, normally `http://localhost:5173`.

## Production Build

Frontend:

```bash
cd frontend
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Backend:

```bash
cd backend
npm start
```

## Environment Variables

| Variable | Used by | Purpose |
|---|---|---|
| `NODE_ENV` | Backend | Runtime environment |
| `PORT` | Backend | Express server port |
| `MONGODB_URI` | Backend | MongoDB connection string |
| `JWT_SECRET_KEY` | Backend | JWT signing secret |
| `REDIS_URL` | Backend | Redis connection string |
| `IMAGEKIT_PUBLIC_KEY` | Backend | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | Backend | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | Backend | ImageKit URL endpoint |
| `GEMINI_API_KEY` | Backend | Google Gemini API access |
| `GOOGLE_CLIENT_ID` | Backend | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Backend | Google OAuth client secret |
| `FRONTEND_URL` | Backend | Frontend origin used for redirects/CORS |
| `VITE_API_URL` | Frontend | Backend API base URL |

Never commit real credentials or secrets to Git.

## API and Real-Time Communication

The backend separates responsibilities across routes, controllers, services, and middleware.

REST endpoints cover authentication, groups, memberships, notes, saved notes, messages, and group encryption-key management.

Socket.IO handles:

- Joining and leaving group rooms
- Real-time encrypted group messages
- AI note-generation requests
- AI note conversations
- Authentication and group membership checks for socket connections

## Caching

Redis is used to cache frequently requested data such as groups, notes, members, and messages.

The backend uses cache keys based on resources and request parameters and invalidates relevant key prefixes after mutations such as creating, updating, joining, or deleting groups and notes.

## Security Notes

StudySync uses several application-level security mechanisms:

- Password hashing with bcrypt
- JWT authentication stored in an HTTP-only cookie
- Protected REST routes
- Socket authentication using the JWT cookie
- Group membership authorization for REST and Socket.IO operations
- Client-side encryption for group chat payloads
- Server-side storage of encrypted message payloads

For production deployment, use strong secrets, HTTPS, restricted CORS origins, secure database credentials, and carefully review the E2EE implementation and key lifecycle.

## Current Development Status

StudySync is an actively developed full-stack project. The repository contains both the application code and supporting UI/design assets. Some areas may still be under development, so behavior and APIs can change as the project evolves.

## License

No open-source license is currently specified for this repository. If you plan to distribute or accept external contributions, add an appropriate license file.

## Author

**Prem Maurya**

GitHub: [@Premkmaurya](https://github.com/Premkmaurya)
