FROM node:20-alpine AS base
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
# accept build time args
ARG DATABASE_URL
ARG API_TOKEN
ARG NEXT_PUBLIC_API_TOKEN

# expose build time args for Next.js build
ENV DATABASE_URL=${DATABASE_URL}
ENV API_TOKEN=${API_TOKEN}
ENV NEXT_PUBLIC_API_TOKEN=${NEXT_PUBLIC_API_TOKEN}
RUN pnpm prisma generate --no-engine

RUN pnpm build

FROM node:20-alpine AS production
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --prod --frozen-lockfile

COPY --from=base /app/.next .next
COPY --from=base /app/public ./public
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/node_modules ./node_modules
ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start"]