# Use the official Bun image
FROM oven/bun:1

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY src/ ./src/
COPY tsconfig.json ./

# Build the TypeScript application
RUN bun run build

# Run the application
ENTRYPOINT ["bun", "run", "src/index.ts"]
CMD ["src/data/input.txt"]
