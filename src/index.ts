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
    // Get input file from command line argument or use default
    const inputFile = process.argv[2] || "src/data/input.txt";
    
    console.log(`Parsing test data: ${inputFile}`);
    const testData = FileParser.parseInputFile(inputFile);

    console.log("Executing calculation test:");
    TestRunner.executeCalculationTest(testData);
};

// Run the application
main();



