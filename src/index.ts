/**
 * Andre Suchitra
 * 
 * Bowling score calculator - Clean Architecture codebase
 * 
 **/
import { FileParser } from './utils/FileParser';
import { TestRunner } from './utils/TestRunner';

// Main application flow
const main = () => {
    console.log("Parsing test data: (default file: src/data/input.txt)");
    const testData = FileParser.parseInputFile();

    console.log("Executing calculation test: \n");
    TestRunner.executeCalculationTest(testData);
};

// Run the application
main();



