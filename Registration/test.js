const fs = require('fs');
let passed = true;

console.log("Registration Test\n");
// TC - 01
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
    console.log("TC-03: script.js exists: PASS");
}
else {
    console.log("TC-03: script.js exists: FAIL");
    passed = false;
}

// TC - 04
if (fs.existsSync("student.json")) {
    console.log("TC-04: student.json exists: PASS");
}
else {
    console.log("TC-04: students.json exists : FAIL");
    passed = false;
}
//Read JSON
const students = JSON.parse(fs.readFileSync("student.json"));
const student = students[0];

// TC - 05
if (student.name.trim() !== "") {
    console.log("TC-05: Name validation: PASS");
}
else {
    console.log("TC-05: Name validation: FAIL");
    passed = false;
}

// TC - 06
if (student.email.includes('@')) {
    console.log("TC-06: Email validation: PASS");
}
else {
    console.log("TC-06: Email validation: FAIL");
    passed = false;
}

// TC-07
if (student.mobile.length === 10) {
    console.log("TC-07: Mobile validation:PASS");
}
else {
    console.log("TC-07: Mobile validation:FAIL");
    passed = false;
}

//TC-08
if (student.branch !== "") {
    console.log("TC-08:Branch validation:PASS");
}
else {
    console.log("TC-08:Branch validation:FAIL");
    passed = false;
}

//TC-09
if (student.password.length >= 6) {
    console.log("TC-09:Password validation:PASS");
}
else {
    console.log("TC-09:Password validation:FAIL");
    passed = false;
}

//TC-10
if (passed) {
    console.log("TC-10:Registration successful:PASS");
    console.log("\nBuild SUCCESS");
    process.exit(0);
}
else {
    console.log("TC-10 : !! Registration Failed !!");
    process.exit(1);
}