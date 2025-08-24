import { readFileSync } from 'fs';
import type { TestData } from '../core/types';
import { Validator } from './Validator';

export class FileParser {
    /**
     * Parse and validate input file and return test data
     * 
     * Normally we have 10 frames, with following frame format combinations:
     * [1,4] - normal frame
     * [10] - strike
     * [5,5] - spare
     * [0,10] - spare bonus
     * [0,0] - normal frame with 0 score
     * [] - 0 score
     * 
     * SPECIAL CASES:
     * 
     * We also have 11th frame for spare bonus (1 roll)
     * [6] - bonus roll with 6 score
     * [10] - bonus roll with 10 score
     * 
     * and added again for 12th frame due to strike bonus on 10th frame (2 rolls)
     * [4], [4] - format is always 1 length array for each bonus roll
     * [10], [4] - strike bonus with 14 score
     * [10], [10] - strike bonus with 20 score
     */
    static parseInputFile(fileName?: string): TestData[] {
        const file = fileName || "src/data/input.txt";

        try {
            const input = readFileSync(file, 'utf8');
            const lines = input.split("\n");
            const testData: TestData[] = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];

                // Skip header line
                if (i === 0) {
                    if (line?.toLowerCase() !== "frames:score") {
                        throw new Error(`Invalid header: ${line}`);
                    }
                    continue;
                }

                // Parse test data line
                const [frames, score] = Validator.parseLineData(line);
                testData.push({ frames, score });
            }

            return testData;
        } catch (error) {
            console.error('Error reading file:', error);
            return [];
        }
    }
}
