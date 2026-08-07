const fs = require('fs');
let passed = true;

console.log("Registration Test\n");
// TC - 01 : index.html exists
if (fs.existsSync("index.html")) {
    console.log("TC-01: index.html exists: PASS");
}
else {
    console.log("TC_01: index.html exists: FAIL");
    passed = false;
}

// TC - 02
if (fs.existsSync("style.css")) {
    console.log("TC-02: style.css exists: PASS");
}
else {
    console.log("TC-02: style.css exists: FAIL");
    passed = false;
}

// TC - 03
if (fs.existsSync("script.js")) {
    console.log("TC-04: script.js exists: PASS");
}
else {
    console.log("TC-04: script.js exists: FAIL");
    passed = false;
}

// TC - 04
if (fs.existsSync("student.json")) {
    console.log("TC - 04: student.json exists: PASS");
}
else {
    console.log("TC - 04: students.json exists : FAIL");
    passed = false;
}
//Read JSON
const students = JSON.parse(fs.readFileSync("student.json"));
const student = students[0];

if (student.name.trim() !== "") {

}