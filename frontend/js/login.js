// ============================================================
// login.js — login aur register dono ka logic ek hi page mein,
// ek "isLoginMode" flag se toggle hota hai.
// ============================================================

// Agar already logged in hai, to seedha events page pe bhej do
if (getToken()) {
  window.location.href = "events.html";
}

let isLoginMode = true; // shuru mein Login mode dikhega

const form = document.getElementById("auth-form");
const submitBtn = document.getElementById("submit-btn");
const toggleBtn = document.getElementById("toggle-btn");
const toggleText = document.getElementById("toggle-text");
const subtitle = document.getElementById("auth-subtitle");
const errorBox = document.getElementById("form-error");

// Login <-> Register ke beech switch karna
toggleBtn.addEventListener("click", () => {
  isLoginMode = !isLoginMode;

  if (isLoginMode) {
    submitBtn.textContent = "Login";
    toggleText.textContent = "New here?";
    toggleBtn.textContent = "Create an account";
    subtitle.textContent = "Login to browse and reserve your seat";
  } else {
    submitBtn.textContent = "Register";
    toggleText.textContent = "Already have an account?";
    toggleBtn.textContent = "Login instead";
    subtitle.textContent = "Create an account to start booking events";
  }

  errorBox.classList.remove("show");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorBox.classList.remove("show");

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Jo endpoint hit karna hai, login mode ke hisaab se decide hota hai
  const endpoint = isLoginMode ? "/users/login" : "/users/register";

  submitBtn.disabled = true;
  submitBtn.textContent = isLoginMode ? "Logging in..." : "Registering...";

  try {
    const data = await apiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    // Dono register aur login response mein "token" milta hai
    setToken(data.token);
    window.location.href = "events.html";
  } catch (error) {
    errorBox.textContent = error.message;
    errorBox.classList.add("show");
    submitBtn.disabled = false;
    submitBtn.textContent = isLoginMode ? "Login" : "Register";
  }
});

/*
===================== HINGLISH NOTES (Viva / Interview) =====================
1. Q: Ek hi HTML form se login aur register dono kaise handle kiye?
   A: isLoginMode boolean variable rakha jo batata hai kaunsa mode
      active hai. Submit hone par usi variable ke hisaab se decide
      karte hain ki "/users/login" hit karna hai ya "/users/register" -
      form fields (username, password) dono APIs mein same hain isliye
      alag form banane ki zaroorat nahi padi.

2. Q: Backend se register call karne par bhi user turant login kyun ho
      jata hai (alag se login karne ki zaroorat nahi)?
   A: Kyunki hamare MERN backend ka registerUser controller register
      hote hi ek JWT token bhi generate karke bhej deta hai (dekh lo
      controllers/userController.js) - isliye register ke turant baad
      hum us token ko save karke seedha events page pe bhej dete hain.

3. Q: submitBtn.disabled = true kyun kiya submit ke time?
   A: Taaki user double-click ya baar-baar submit na kar de jab tak
      pehli request complete na ho jaye - isse duplicate accounts ya
      duplicate requests jaane se bachte hain.
===============================================================================
*/
