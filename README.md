# Bowling Score Calculator

A TypeScript application that calculates bowling scores from frame data.

## Project Structure

```
one-com/
├── src/                    # Source code directory
│   ├── index.ts           # Main application file
│   ├── core/              # Core business logic
│   │   ├── ScoreCalculator.ts  # Bowling score calculation logic
│   │   └── types.ts       # Type definitions
│   ├── utils/             # Utility functions
│   │   ├── FileParser.ts  # Input file parsing
│   │   ├── TestRunner.ts  # Test execution
│   │   └── Validator.ts   # Input validation
│   ├── test/              # Test files
│   └── data/              # Input data files
│       ├── input.txt      # Sample input data
│       └── input2.txt     # Additional test data, you can add your own test data
├── Dockerfile              # Docker configuration
├── .dockerignore           # Docker ignore file
├── package.json            # Dependencies and scripts
├── bun.lock               # Bun lock file
├── tsconfig.json          # TypeScript config
└── .gitignore             # Git ignore file
```

## Dependencies

- **Bun** (recommended) - Modern JavaScript runtime

   Homebrew:
   ```bash
   brew install oven-sh/bun/bun # for macOS and Linux
   ```

   Curl:

   ```bash
   curl -fsSL https://bun.com/install | bash # for macOS, Linux, and WSL
   ```

- **TypeScript 5+** - For type safety and compilation
- **Docker** - For containerized deployment (optional)

## Running with Docker

1. **Build the image:**
   ```bash
   docker build -t bowling-app .
   ```

2. **Run with default input file:**
   ```bash
   docker run --rm bowling-app
   ```

3. **Run with different input file:**
   ```bash
   # Use input2.txt
   docker run --rm bowling-app src/data/input2.txt
   
   # Use custom input file
   docker run --rm bowling-app src/data/my-input.txt
   ```

4. **Run with custom data file (mounted volume):**
   ```bash
   docker run --rm -v $(pwd)/src/data:/app/src/data bowling-app src/data/input2.txt
   ```

## Running Locally (without Docker, but install `Bun` first) 

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

4. **Run different test file:**

   To run using different input test files, create `.txt` file with format explained below section  in `src/data/` folder, and run:
   ```bash
   bun run start src/data/<your_file.txt>
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
- Strike frame has length 1, and spare and open frame has length 2
- Empty frame is valid (we count it as zero)
- Non-array frame is INVALID

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
