/**
 * Andre Suchitra - One.com
 * 
 * Bowling score calculator
 * 
 **/
import { readFileSync } from 'fs';
import type { Frame, FrameSeries, TestData } from './types/index.ts';

/**
 * parse and validate frame data string and return frame series
 * 
 * ex:
 * [] => valid
 * [[1,2]] => valid
 * [[5,3], [10], [4,6]] => valid
 * 
 * [1, [1,3]] => invalid
 * ['a', 1] => invalid
 */
const parseFrameData = (frameString: string): FrameSeries => {
    try {
        let resultFrame: FrameSeries = [];
        const parsed = JSON.parse(frameString);

        // parse 1st level array
        if(!Array.isArray(parsed)) {
            throw new Error(`Invalid frames (must be array): ${frameString}`);
        }

        if(parsed.length === 0) {
            return resultFrame;
        }

        // frame must be 1-level nested array, with max 2 elements
        const parsedFrame = parsed as Frame[];
        parsedFrame.forEach(frame => {
            if(!Array.isArray(frame)) {
                throw new Error(`Invalid frames (must be array): ${frameString}`);
            }

            if(frame.length > 2) {
                throw new Error(`Invalid frames (must be max 2 elements): ${frameString}`);
            }

            // parse roll data
            frame.forEach(roll => {
                if(isNaN(Number(roll))) {
                    throw new Error(`Invalid roll data (must be numbers): ${roll}`);
                }
            });

            resultFrame.push(frame);
        });

        return resultFrame;
    } catch {
        throw new Error(`Invalid frames: ${frameString}`);
    }
}

/**
 * parse line data and return frame series and score
 * 
 * ex:
 * []:0 -> no frames = 0 score
 * [[1,2]]:3 -> 1st frame = [1,2] = 3 score
 * [[5,3], [10], [4,6]]:38 -> 1st frame = [5,3] = 8 score, 2nd frame = [10] = 10 score, 3rd frame = [4,6] = 10 score = 38 score
 */
const parseLineData = (line: string | undefined): [FrameSeries, number] => {
    if(!line) {
        throw new Error("Invalid line");
    }

    let frame: FrameSeries = [];
    // line will be format: frames:score
    // ex: 
    // []:0
    // [[1,2]]:3
    // [[5,3], [10], [4,6]]:38
    const lineData = line.split(":");

    // check if score format is valid
    if(lineData.length !== 2) {
        throw new Error(`Invalid line format: ${lineData}`);
    }
    
    const [frames, score] = lineData;
    if(score?.length === 0 || isNaN(Number(score))) {
        throw new Error(`Invalid score: ${score}`);
    }

    // check if frames format is valid
    if(!frames || frames.length === 0) {
        throw new Error(`Invalid frames: ${frames}`);
    }

    frame = parseFrameData(frames);

    return [frame, Number(score)];
}

/***
 * parse and validate input file and return test data type for actual bowling score calculation
 * 
 * ex:
 * []:0
 * [[1,2]]:3
 * [[5,3], [10], [4,6]]:38
 * 
 */
const parseInputFile = (fileName?: string): TestData[] => {
    let file = fileName || "src/data/input.txt";

    try {
        const input = readFileSync(file, 'utf8');
        const lines = input.split("\n");
        const testData: TestData[] = [];

        for(let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // check header on first line
            if(i === 0) {
                // automatically skip to next line if header is valid
                // otherwise throw error
                if(line?.toLowerCase() !== "frames:score") {
                    throw new Error(`Invalid header: ${line}`);
                }
            } else {
                const [frame, score] = parseLineData(line);
                testData.push({ frames: frame, score: Number(score) });
            }
        }

        return testData;
    } catch (error) {
        console.error('Error reading file:', error);
    }

    return [];
}

/***
 * Calculate score from frame series input
 * 
 */
const calculateScore = (frame: FrameSeries): number => {
    const MAX_FRAME_LENGTH = 10;
    let score = 0;

    for(let i = 0; i < frame.length; i++) {
        let frameScore = 0;

        console.log(`Frame ${i + 1}: ${frame[i]}`);

        const currentFrame = frame[i];

        // strike score
        if(currentFrame?.length === 1) {
            frameScore = 10;

            // for strike, we need to add the next 2 frames if they exist
            const nextFrame = frame[i + 1] as Frame;
            const secondNextFrame = frame[i + 2] as Frame;

            if(nextFrame) {
                if(nextFrame[0]) {
                    frameScore += nextFrame[0] ?? 0;
                }
                if(nextFrame[1]) {
                    frameScore += nextFrame[1] ?? 0;
                }
            }

            if(secondNextFrame) {
                frameScore += (secondNextFrame[0] ?? 0) + (secondNextFrame[1] ?? 0);
            }
        } else if(currentFrame?.length === 2) {
            frameScore = currentFrame[0] + currentFrame[1];

            // spare score, take the first roll of next frame
            if(frameScore === 10) {
                const nextFrame = frame[i + 1] as Frame;

                if(nextFrame?.[0]) {
                    frameScore += nextFrame[0] ?? 0;
                }
                if(nextFrame?.[1]) {
                    frameScore += nextFrame[1] ?? 0;
                }
            }
        } else {
            frameScore = 0;
        }

        score += frameScore;
    }

    return score;
}

const executeCalculationTest = (testData: TestData[]): void => {
    for(let i = 0; i < testData.length; i++) {
        console.log(`\nTest ${i + 1}`);
        const frame = testData[i]?.frames;
        const baselineScore = testData[i]?.score;

        let calculatedScore = 0;

        if(!frame || !baselineScore) {
            calculatedScore = 0;
        } else {
            calculatedScore = calculateScore(frame);
        }


        console.log(`Test ${i + 1}: Calculated score: ${calculatedScore}, Baseline score: ${baselineScore}, Result: ${calculatedScore === baselineScore ? "PASS" : "FAIL"}`);
    }
}

console.log("Parsing test data: (default file: data/input.txt)");
const testData = parseInputFile();

console.log("Executing calculation test: \n");
executeCalculationTest(testData);



