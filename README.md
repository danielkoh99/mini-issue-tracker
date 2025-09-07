# Issue Tracker

Simple issue tracking app with Next.js, Prisma, and ShadCN.

## Prerequisites

- Node.js ≥ 18
- pnpm
- PostgreSQL db set up

## Setup

1. Clone the repo:

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up env vars:

```bash
cp .env.example .env
```

4. Run the development server:

```bash
pnpm run dev
```

5. Run Prisma migrations:

```bash
pnpm run prisma:generate
pnpm run prisma:migrate dev
```

6. Run the seed script:

```bash
pnpm run seed
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

2. Build the Docker image:

```bash
docker build -t issue-tracker .
```

3. Run the Docker container:

```bash
docker-compose up -d
```
