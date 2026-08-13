const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 3000;
const DATA_FILE = path.join(__dirname, "student.json");

function readStudents() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, "[]");
        }

        const data = fs.readFileSync(DATA_FILE, "utf8");

        if (!data.trim()) {
            return [];
        }

        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading student.json:", error);
        return [];
    }
}

function saveStudents(students) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(students, null, 4),
        "utf8"
    );
}

function sendJSON(response, statusCode, data) {
    response.writeHead(statusCode, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    response.end(JSON.stringify(data));
}

function serveStaticFile(request, response) {
    let filePath;

    if (request.url === "/") {
        filePath = path.join(__dirname, "index.html");
    } else {
        filePath = path.join(__dirname, request.url);
    }

    // Prevent access to files outside this directory
    if (!filePath.startsWith(__dirname)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
    }

    if (!fs.existsSync(filePath)) {
        response.writeHead(404);
        response.end("File not found");
        return;
    }

    const ext = path.extname(filePath);

    const contentTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".json": "application/json"
    };

    const contentType = contentTypes[ext] || "text/plain";

    response.writeHead(200, {
        "Content-Type": contentType
    });

    response.end(fs.readFileSync(filePath));
}

const server = http.createServer((request, response) => {

    // -------------------------------
    // REGISTER USER
    // -------------------------------

    if (request.method === "POST" && request.url === "/register") {

        let body = "";

        request.on("data", chunk => {
            body += chunk.toString();
        });

        request.on("end", () => {

            try {
                const user = JSON.parse(body);

                const name = user.name?.trim();
                const mobile = user.mobile?.trim();
                const email = user.email?.trim().toLowerCase();
                const branch = user.branch?.trim();
                const password = user.password;

                // Basic validation
                if (!name || !mobile || !email || !branch || !password) {
                    sendJSON(response, 400, {
                        success: false,
                        message: "All fields are required."
                    });
                    return;
                }

                if (!/^\d{10}$/.test(mobile)) {
                    sendJSON(response, 400, {
                        success: false,
                        message: "Mobile must be exactly 10 digits."
                    });
                    return;
                }

                if (!email.includes("@")) {
                    sendJSON(response, 400, {
                        success: false,
                        message: "Invalid email address."
                    });
                    return;
                }

                if (password.length < 6) {
                    sendJSON(response, 400, {
                        success: false,
                        message: "Password must be at least 6 characters."
                    });
                    return;
                }

                const students = readStudents();

                // ----------------------------------------
                // CHECK IF USER ALREADY EXISTS
                // ----------------------------------------

                const existingUser = students.find(student =>
                    student.email?.toLowerCase() === email ||
                    student.mobile === mobile
                );

                if (existingUser) {
                    sendJSON(response, 409, {
                        success: false,
                        message: "User already exists"
                    });
                    return;
                }

                // ----------------------------------------
                // CREATE NEW USER
                // ----------------------------------------

                const newStudent = {
                    name: name,
                    mobile: mobile,
                    email: email,
                    branch: branch,
                    password: password
                };

                students.push(newStudent);

                saveStudents(students);

                console.log("New user registered:", email);

                sendJSON(response, 201, {
                    success: true,
                    message: "Registration successful!"
                });

            } catch (error) {

                console.error(error);

                sendJSON(response, 500, {
                    success: false,
                    message: "Server error."
                });
            }
        });

        return;
    }

    // -------------------------------
    // SERVE HTML / CSS / JS
    // -------------------------------

    if (request.method === "GET") {
        serveStaticFile(request, response);
        return;
    }

    response.writeHead(404);
    response.end("Not Found");
});

server.listen(PORT, () => {
    console.log(`Registration server running at http://localhost:${PORT}`);
});