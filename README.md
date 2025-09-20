# Issue Tracker

A minimal issue-tracking web app (like a micro-Jira) built as part of a frontend developer interview.

### Tech stack:
	•	Next.js (App Router)
	•	TypeScript
	•	Prisma (Postgres/SQLite)
	•	REST API
	•	shadcn/ui

The project also includes a Docker and Docker Compose setup for seamless local development and easy deployment.


## Core features
	•	Create / list / update / close issues
	•	Issue fields: title, description, status (open/in-progress/closed), priority, assignee (optional), createdAt, updatedAt
	•	Simple hardcoded auth for API
	•	Responsive UI with accessible components from shadcn/ui

## Prerequisites

- Node.js ≥ 18
- pnpm
- PostgreSQL db set up in Prisma cloud

## Setup

1. Clone the repo:

```bash
git clone https://github.com/danielkoh99/mini-issue-tracker.git
cd mini-issue-tracker
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up env vars:

```bash
cp .env.example .env
```

Then set up the required env vars.

4. Run Prisma generation and migrations:

```bash
pnpm run prisma:generate
pnpm run prisma:migrate dev
```

6. Run the seed script:

```bash
pnpm run seed
```

4. Run the development server:

```bash
pnpm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

1. Build the app:

```bash
pnpm run build
```

2. Start the app:

```bash
pnpm run start
```

## Docker Setup

1. Clone the repo:

```bash
git clone <repo-url>
cd <repo-folder>
```

3. Set up env vars:

```bash
cp .env.example .env
```

Then set up the required env vars.

2. Build and run the Docker container:

```bash
docker-compose up --build -d
```
