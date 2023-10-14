import { loginEvent } from "./API/login.mjs";
import { registerEvent } from "./API/register.mjs";
const loginRegisterButton = document.querySelector("#login-register-btn");
const registerButton = document.querySelector("#register-btn");

const API_BASE_URL = "https://api.noroff.dev";

loginRegisterButton.addEventListener("click", loginEvent);
registerButton.addEventListener("click", registerEvent);

/**
 * Checks if a user is logged.
 * If the user ID and access token are available it redirects to the profile page. 
 *
 * @function checkIfLoggedIn
 *
 * @returns {void} This function does not return a value but may perform a redirect if the user
 * is logged in.
 */
function checkIfLoggedIn() {
    const userId = localStorage.getItem("name")
    const token = localStorage.getItem("accessToken")

    if (userId && token)
        window.location.replace(`/profile/index.html?=${userId}`)
}
checkIfLoggedIn();

