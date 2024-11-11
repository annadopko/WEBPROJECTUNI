const API_URL = "http://localhost:8000/api/auth";

// Функція для логіки на сторінці логіну
async function handleLogin(event) {
    event.preventDefault();
    const email = document.querySelector("#loginForm input[name='email']").value;
    const password = document.querySelector("#loginForm input[name='password']").value;
    const messageElement = document.getElementById("message");

    try {
        const response = await fetch(`${API_URL}/login`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const { accessToken } = await response.json();
            localStorage.setItem("token", accessToken); // Зберігаємо JWT в локальному сховищі
            window.location.href = "index.html"; // Переходимо на головну сторінку після успіху
        } else {
            const error = await response.json();
            console.error("Login error:", error); // Логування помилки
            messageElement.textContent = error.message;
        }
    } catch (error) {
        console.error("Fetch error during login:", error); // Логування помилки
        messageElement.textContent = "Login failed. Please try again.";
    }
}

// Функція для логіки на сторінці реєстрації
async function handleRegister(event) {
    event.preventDefault();
    const username = document.querySelector("#registerForm input[name='username']").value;
    const email = document.querySelector("#registerForm input[name='email']").value;
    const password = document.querySelector("#registerForm input[name='password']").value;
    const messageElement = document.getElementById("message");

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            messageElement.textContent = "Registration successful! You can now log in.";
            messageElement.style.color = "green";
        } else {
            const error = await response.json();
            console.error("Registration error:", error); // Логування помилки
            messageElement.textContent = error.message;
        }
    } catch (error) {
        console.error("Fetch error during registration:", error); // Логування помилки
        messageElement.textContent = "Registration failed. Please try again.";
    }
}

// Вибір функції залежно від сторінки
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", handleLogin);
    } else if (document.getElementById("registerForm")) {
        document.getElementById("registerForm").addEventListener("submit", handleRegister);
    }
});

async function checkTaskProgress(taskId) {
    try {
        const response = await fetch(`http://localhost:8000/api/task/${taskId}/progress`);
        if (response.ok) {
            const { progress, status } = await response.json();
            document.getElementById("progress").textContent = `Прогрес: ${progress}% - ${status}`;
        }
    } catch (error) {
        console.error("Помилка при перевірці прогресу:", error);
    }
}

// Викликайте цю функцію з інтервалом у 2 секунди
const taskId = "ID_ЗАДАЧІ"; // Отримайте ID задачі, яку створили
setInterval(() => checkTaskProgress(taskId), 2000);
