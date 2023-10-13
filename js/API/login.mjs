import { apiFetch } from "./apiFetch.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1";

const profileLink = document.getElementById("navProfile");
profileLink.addEventListener("click", () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        window.location.href = `/profile/index.html`;
    } else {
        alert("You need to be logged in to view profile!");
    }
});

function setToken(result) {
    if (result.accessToken) {
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("email", result.email);
        localStorage.setItem("name", result.name);
        window.location.href = "/feed/index.html"
    } else {
        throw new Error("Access token not found in the response.")
    }
};

const API_SOCIAL_LOGIN_PATH = "/social/auth/login";
const API_SOCIAL_LOGIN_URL = `${API_BASE_URL}${API_SOCIAL_LOGIN_PATH}`;

/**
 * Handles the login event when a form is submitted.
 * 
 * @param {Event} event - The event object representing the form submission.
 */


// ID
export async function loginEvent(event) {
    event.preventDefault();

    const emailInput = document.querySelector("#floatingInput");
    const passwordInput = document.querySelector("#floatingPassword");

    const loginOption = {
        method: "POST",
        body: JSON.stringify({
            "email": emailInput.value,
            "password": passwordInput.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    };


    const result = await apiFetch(API_SOCIAL_LOGIN_URL, loginOption);

    setToken(result);
};



