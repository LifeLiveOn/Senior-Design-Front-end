# syntax=docker/dockerfile:1
# Optimized production image: build static React app then serve via unprivileged nginx

FROM node:20-alpine AS build
ENV NODE_ENV=production
WORKDIR /app

# Install dependencies with better caching
COPY website-react/package*.json ./
RUN npm ci --no-audit --no-fund

# Copy source and build
COPY website-react/ ./
RUN npm run build

# Runtime: unprivileged nginx on port 8080
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime
# Ensure nginx can modify the config during entrypoint scripts
COPY --chown=101:101 nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
