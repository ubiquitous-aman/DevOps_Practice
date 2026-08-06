const fs = require('fs');
const assert = require('assert');

console.log("Starting Jenkins Pipeline Tests...\n");

let passed = 0;
const total = 10;

// Helper function to run and log tests
function runTest(testName, testFunction) {
    try {
        testFunction();
        console.log(`✅ [PASS] ${testName}`);
        passed++;
    } catch (error) {
        console.error(`❌ [FAIL] ${testName}`);
        console.error(`   -> ${error.message}`);
    }
}

// Tests 1-5: Check if required files exist
runTest("1. index.html file exists", () => assert(fs.existsSync('./index.html'), "index.html is missing"));
runTest("2. style.css file exists", () => assert(fs.existsSync('./style.css'), "style.css is missing"));
runTest("3. script.js file exists", () => assert(fs.existsSync('./script.js'), "script.js is missing"));
runTest("4. students.json file exists", () => assert(fs.existsSync('./students.json'), "students.json is missing"));
runTest("5. test.js file exists", () => assert(fs.existsSync('./test.js'), "test.js is missing"));

// Tests 6-10: Verify code functionality & integrity
runTest("6. HTML contains a form and submit button", () => {
    const html = fs.readFileSync('./index.html', 'utf8');
    assert(html.includes('<form'), "Missing <form> tag");
    assert(html.includes('type="submit"'), "Missing submit button");
});

runTest("7. JS enforces strict 10-digit mobile rule", () => {
    const js = fs.readFileSync('./script.js', 'utf8');
    assert(js.includes('/^\\d{10}$/') || js.includes('length === 10'), "No 10-digit validation logic found");
});

runTest("8. JS checks for '@' symbol in email", () => {
    const js = fs.readFileSync('./script.js', 'utf8');
    assert(js.includes('.includes("@")') || js.includes('.includes(\'@\')'), "No '@' email validation logic found");
});

runTest("9. JS enforces minimum 6 character password", () => {
    const js = fs.readFileSync('./script.js', 'utf8');
    assert(js.includes('< 6'), "No 6-character password logic found");
});

runTest("10. students.json is valid JSON and contains exactly 5 records", () => {
    const data = JSON.parse(fs.readFileSync('./students.json', 'utf8'));
    assert(Array.isArray(data), "JSON must be an array");
    assert.strictEqual(data.length, 5, `Expected 5 students, but found ${data.length}`);
});

// Final Jenkins Exit Code Logic
console.log(`\nTest Summary: ${passed}/${total} tests passed.`);
if (passed !== total) {
    console.error("\nPipeline Failed: Not all tests passed.");
    process.exit(1); // Standard non-zero exit code to fail the Jenkins build
} else {
    console.log("\nPipeline Success: All tests passed!");
    process.exit(0);
}