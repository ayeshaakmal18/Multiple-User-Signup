let allUsers = [];
let users = localStorage.getItem("users");
if (users !== null) {
    allUsers = JSON.parse(users);
}

function signup() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!name.value || !email.value || !password.value) {
        alert("Please complete all fields.");
        return;
    }

    const user = {
        name: name.value.trim(),
        email: email.value.trim().toLowerCase(),
        password: password.value
    };

    allUsers.push(user);
    localStorage.setItem("users", JSON.stringify(allUsers));
    localStorage.setItem("currentUser", JSON.stringify(user));
    location.href = "welcome.html";
}

function login() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const filterUser = allUsers.find(data => data.email === email.value.trim().toLowerCase() && data.password === password.value);
    if (filterUser) {
        localStorage.setItem("currentUser", JSON.stringify(filterUser));
        location.href = "welcome.html";
    } else {
        alert("Invalid Credentials");
    }
}

function loadWelcome() {
    const currentUserString = localStorage.getItem("currentUser");
    if (!currentUserString) {
        location.href = "index.html";
        return;
    }

    const currentUser = JSON.parse(currentUserString);
    const title = document.getElementById("welcome-title");
    const message = document.getElementById("welcome-message");

    if (title) {
        title.textContent = `Welcome, ${currentUser.name}!`;
    }

    if (message) {
        message.textContent = `Your account has been successfully created. Enjoy your personalized dashboard and explore more features.`;
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    location.href = "index.html";
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        if (document.getElementById("welcome-title")) {
            loadWelcome();
        }
    });
} else {
    if (document.getElementById("welcome-title")) {
        loadWelcome();
    }
}
