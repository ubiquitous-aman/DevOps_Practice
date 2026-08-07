document.getElementById('registrationForm').addEventListener('submit', function (event) {
    // Prevent actual form submission for validation
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();
    const branch = document.getElementById('branch').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // 1. Name constraint (non-empty)
    if (name === "") {
        errorMessage.textContent = "Error: Name cannot be empty.";
        return;
    }

    // 2. Mobile constraint (strictly 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
        errorMessage.textContent = "Error: Mobile must be exactly 10 digits.";
        return;
    }

    // 3. Email constraint (contains '@')
    if (!email.includes("@")) {
        errorMessage.textContent = "Error: Invalid email format (must contain '@').";
        return;
    }

    // 4. Branch constraint (non-empty)
    if (branch === "") {
        errorMessage.textContent = "Error: Branch cannot be empty.";
        return;
    }

    // 5. Password constraint (strong >= 6 chars)
    if (password.length < 6) {
        errorMessage.textContent = "Error: Password must be at least 6 characters.";
        return;
    }

    // If all tests pass
    errorMessage.style.color = "green";
    errorMessage.textContent = "Registration Successful!";

    // Reset form after success
    this.reset();
});