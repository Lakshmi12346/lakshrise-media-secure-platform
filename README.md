# LakshRise Media Secure Website

Advanced dynamic website scaffold for LakshRise Media.

## Stack

- Frontend: Next.js, Tailwind CSS, Framer Motion
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Auth: JWT API auth and NextAuth OAuth configuration
- Security: Helmet, rate limiting, HTTPS enforcement, CSRF, CORS, sanitization
- Hosting: Vercel for frontend, Render/AWS for API

## Run Locally

```bash
npm install
copy .env.example .env
npm run dev
```

Frontend: `http://localhost:3000`

API: `http://localhost:5000`

## Key Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/security/csrf-token`
- `GET /api/services`
- `POST /api/leads`
- `GET /api/leads` with bearer token

## Deployment

- Vercel can deploy the Next.js app with `NEXT_PUBLIC_API_URL` pointed at the API host.
- Render/AWS can run `node server/index.js` with `MONGODB_URI`, JWT, OAuth, and SMTP secrets configured.
