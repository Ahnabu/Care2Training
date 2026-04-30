# Care2 Training

Care2 Training is a Next.js + Express workspace for the public marketing site, appointment booking flow, and supporting backend integrations.

## Project Structure

- `frontend/` - Next.js 16 app router site with the booking form and UI components
- `backend/` - Express API that can receive appointment submissions, forward them to your own API, and send email via SMTP
- `docs/` - product, design, performance, and release notes
- `agents/` - reusable prompts and runbooks for future work

## Getting Started

Install dependencies in each app and run them separately:

```bash
cd frontend
npm install
npm run dev
```

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Frontend:

- `BACKEND_API_URL` - backend base URL used by the Next.js API proxy

Backend:

- `PORT` - Express server port
- `CORS_ORIGIN` - allowed frontend origin
- `APPOINTMENT_API_URL` - optional external API destination for forwarded bookings
- `APPOINTMENT_API_METHOD` - HTTP method used for forwarding
- `APPOINTMENT_API_HEADERS_JSON` - optional JSON headers for the forwarded request
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP port
- `SMTP_SECURE` - set to `true` for secure SMTP connections
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `MAIL_FROM` - sender address
- `MAIL_TO` - destination inbox
- `MAIL_SUBJECT` - email subject line

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
