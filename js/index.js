import { loginEvent } from "./API/login.mjs";
import { registerEvent } from "./API/register.mjs";
const loginRegisterButton = document.querySelector("#login-register-btn");
const registerButton = document.querySelector("#register-btn");

const API_BASE_URL = "https://api.noroff.dev";

loginRegisterButton.addEventListener("click", loginEvent);
registerButton.addEventListener("click", registerEvent);

function checkIfLoggedIn() {
    const userId = localStorage.getItem("name")
    const token = localStorage.getItem("accessToken")

    if (userId && token)
        window.location.replace(`/profile/index.html?=${userId}`)
}
checkIfLoggedIn();