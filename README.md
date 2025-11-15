# Subscription Tracker

Simple subscription-tracking API with scheduled reminder workflows.

---

## Project structure

Key files and folders:

- [app.js](app.js) — Express app and server bootstrap
- [package.json](package.json) — NPM scripts and dependencies
- [config/env.js](config/env.js) — Environment loader
- [config/nodemailer.js](config/nodemailer.js) — Email transporter and [`accountEmail`](config/nodemailer.js)
- [config/upstash.js](config/upstash.js) — Upstash workflow client (`workflowClient`)  
- [config/arcjet.js](config/arcjet.js) — Arcjet protection client (`aj`)
- [database/mongodb.js](database/mongodb.js) — MongoDB connection helper (`connectDB`)

API layer:
- Routes:
  - [routes/auth.routes.js](routes/auth.routes.js)
  - [routes/user.routes.js](routes/user.routes.js)
  - [routes/subscription.routes.js](routes/subscription.routes.js)
  - [routes/workflow.routes.js](routes/workflow.routes.js)
- Controllers:
  - [`signUp`, `signIn`, `signOut`](controllers/auth.controller.js) — auth flows
  - [`getUsers`, `getUser`](controllers/user.controller.js)
  - [`createSubscription`, `getUserSubscriptions`](controllers/subscription.controller.js)
  - [`sendReminders`](controllers/workflow.controller.js) — Upstash workflow handler

Data models:
- [`User`](models/user.model.js)
- [`Subscription`](models/subscription.model.js)

Middleware and utils:
- [`authorize`](middlewares/auth.middleware.js) — JWT authorization
- [`arcjetMiddleware`](middlewares/arcjet.middleware.js) — request protection
- [middlewares/error.middleware.js](middlewares/error.middleware.js) — error handler
- [`sendReminderEmail`](utils/send-email.js) — sends emails using Nodemailer
- [`generateEmailTemplate`, `emailTemplates`](utils/email-template.js) — HTML templates used by reminders

Tests:
- [test/](test/) — sample test fixtures: [test/user.json](test/user.json), [test/subscription.json](test/subscription.json)

---

## Features

- User signup/signin with JWT authentication ([controllers/auth.controller.js](controllers/auth.controller.js))
- CRUD endpoints for subscriptions and user retrieval ([routes/*.js](routes/))
- Subscription model auto-calculates `renewalDate` and updates status ([models/subscription.model.js](models/subscription.model.js))
- Scheduled email reminders using Upstash workflows and the handler [`sendReminders`](controllers/workflow.controller.js)
- Email templating in [`utils/email-template.js`](utils/email-template.js) and sending via [`utils/send-email.js`](utils/send-email.js)
- Arcjet protection middleware configured in [config/arcjet.js](config/arcjet.js)

---

## Quick start

1. Install dependencies:
   ```sh
   npm install