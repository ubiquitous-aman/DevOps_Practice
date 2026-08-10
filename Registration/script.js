document
    .getElementById("registrationForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const email = document.getElementById("email").value.trim();
        const branch = document.getElementById("branch").value.trim();
        const password = document.getElementById("password").value;

        const errorMessage = document.getElementById("error-message");

        // Reset message
        errorMessage.textContent = "";
        errorMessage.style.color = "red";

        // -------------------------
        // CLIENT-SIDE VALIDATION
        // -------------------------

        if (name === "") {
            errorMessage.textContent = "Error: Name cannot be empty.";
            return;
        }

        const mobileRegex = /^\d{10}$/;

        if (!mobileRegex.test(mobile)) {
            errorMessage.textContent =
                "Error: Mobile must be exactly 10 digits.";
            return;
        }

        if (!email.includes("@")) {
            errorMessage.textContent =
                "Error: Invalid email format.";
            return;
        }

        if (branch === "") {
            errorMessage.textContent =
                "Error: Branch cannot be empty.";
            return;
        }

        if (password.length < 6) {
            errorMessage.textContent =
                "Error: Password must be at least 6 characters.";
            return;
        }

        // -------------------------
        // SEND DATA TO SERVER
        // -------------------------

        const user = {
            name: name,
            mobile: mobile,
            email: email,
            branch: branch,
            password: password
        };

        try {

            const response = await fetch("/register", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)
            });

            const result = await response.json();

            // -------------------------
            // USER ALREADY EXISTS
            // -------------------------

            if (response.status === 409) {

                errorMessage.style.color = "red";
                errorMessage.textContent = "User already exists";

                return;
            }

            // -------------------------
            // OTHER ERROR
            // -------------------------

            if (!response.ok) {

                errorMessage.style.color = "red";
                errorMessage.textContent = result.message;

                return;
            }

            // -------------------------
            // SUCCESS
            // -------------------------

            errorMessage.style.color = "green";
            errorMessage.textContent = result.message;

            document.getElementById("registrationForm").reset();

        } catch (error) {

            console.error("Error:", error);

            errorMessage.style.color = "red";
            errorMessage.textContent =
                "Unable to connect to server.";
        }
    });