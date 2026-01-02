# =========================
# 1️⃣ Build Stage
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json ./
RUN npm ci

# 소스 복사
COPY . .

# SvelteKit SSR 빌드
RUN npm run build


# =========================
# 2️⃣ Runtime Stage
# =========================
FROM node:20-alpine

WORKDIR /app

# production 환경
ENV NODE_ENV=production

# 런타임에 필요한 것만 복사
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# SvelteKit 기본 포트
EXPOSE 3000

# SvelteKit adapter-node 실행 엔트리
CMD ["node", "build/index.js"]