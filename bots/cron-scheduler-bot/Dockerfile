FROM oven/bun:latest

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and bun.lockb
COPY package.json ./

# Install dependencies
RUN bun install

# Copy the TypeScript source code and configuration files
COPY jobs ./jobs
COPY bin ./bin
COPY commands.ts ./

# Copy the .env file
COPY env.ts .env ./

# Run the compiled JavaScript code
CMD ["bun", "run", "bin/start.ts"]
