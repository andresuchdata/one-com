# Bowling Score Calculator

A TypeScript application that calculates bowling scores from frame data.

## Project Structure

```
one-com/
├── src/                    # Source code directory
│   ├── index.ts           # Main application file
│   ├── types/             # Type definitions
│   ├── test/              # Test files
│   └── data/              # Input data files
├── Dockerfile              # Docker configuration
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript config
```

## Running with Docker

1. **Build the image:**
   ```bash
   docker build -t bowling-app .
   ```

2. **Run the container:**
   ```bash
   docker run --rm bowling-app
   ```

3. **Run with custom data file:**
   ```bash
   docker run --rm -v $(pwd)/src/data:/app/src/data bowling-app
   ```

## Running Locally (without Docker)

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Run the application:**
   ```bash
   bun start
   ```

3. **Run in development mode:**
   ```bash
   bun run dev
   ```

## Input Data Format

The application expects input data in the following format:

```
frames:score
[[1,4], [3,6], [7,1]]:22
[[5,3], [10], [4,6]]:38
[]:0
```

- Each line contains frame data and expected score separated by `:`
- First line is a header: `frames:score`
- Frame data is in JSON format
- Each frame is an array of 1-2 numbers representing rolls

## Features

- Parses and validates bowling frame data
- Calculates bowling scores with strike and spare bonuses
- Supports multiple test cases
- Input validation and error handling
- TypeScript for type safety

## Requirements

- Docker and Docker Compose (for containerized deployment)
- Bun runtime (for local development)
- TypeScript 5+
