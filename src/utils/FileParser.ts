import { readFileSync } from 'fs';
import type { TestData } from '../core/types';
import { Validator } from './Validator';

export class FileParser {
    /**
     * Parse and validate input file and return test data
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
