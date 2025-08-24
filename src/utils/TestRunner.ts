import type { TestData } from '../core/types';
import { ScoreCalculator } from '../core/ScoreCalculator';

export class TestRunner {
    /**
     * Execute calculation tests and report results
     */
    static executeCalculationTest(testData: TestData[]): void {
        for (let i = 0; i < testData.length; i++) {
            console.log(`==========================================================================`);
            console.log(`Starting Test ${i + 1}....`);
            console.log(`==========================================================================`);
            
            const frame = testData[i]?.frames;
            const baselineScore = testData[i]?.score;

            let calculatedScore = 0;

            if (frame && baselineScore !== undefined) {
                calculatedScore = ScoreCalculator.calculateScore(frame);
            }

            const result = calculatedScore === baselineScore ? "PASS" : "FAIL";
            
            console.log(`==========================================================================`);
            console.log(`Test ${i + 1}: Calculated score: ${calculatedScore}, Baseline score: ${baselineScore}, Result: ${result}`);
            console.log(`==========================================================================`);
        }
    }
}
