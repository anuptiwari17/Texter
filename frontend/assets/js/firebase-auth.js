import { auth } from "./firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.register = function () {
    console.log("Register function triggered");  // Debugging log
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    
    console.log("Email:", email, "Password:", password);  // Debugging log

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Registration successful!", userCredential);  // Debugging log
            alert("Registration successful!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error("Registration error:", error);  // Debugging log
            alert(error.message);
        });
};



// Login function
window.login = function () {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            alert(error.message);
        });
};

// Logout function
window.logout = function () {
    signOut(auth)
        .then(() => {
            alert("Logged out successfully!");
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert(error.message);
        });
};

// Redirect to dashboard if logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (document.getElementById("user-email")) {
            document.getElementById("user-email").innerText = `Logged in as: ${user.email}`;
        }
    } else {
        if (window.location.pathname.includes("dashboard.html")) {
            window.location.href = "login.html";
        }
    }
});
