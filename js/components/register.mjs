import { apiFetch } from "./apifetch.mjs";
const API_BASE_URL = "https://api.noroff.dev/api/v1";
const API_SOCIAL_REGISTER_PATH = "/social/auth/register";
const API_SOCIAL_REGISTER_URL = `${API_BASE_URL}${API_SOCIAL_REGISTER_PATH}`;

/**
 * Handles the registration event when a form is submitted.
 * 
 * @param {Event} event - The event object representing the form submission.
 */
export async function registerEvent(event) {
    event.preventDefault();

    const nameRegisterInput = document.querySelector("#floatingRegisterNameInput")
    const emailRegisterInput = document.querySelector("#floatingRegisterEmailInput")
    const passwordRegisterInput = document.querySelector("#floatingRegisterPasswordInput")

    const registerOption = {
        method: "POST",
        body: JSON.stringify({
            "name": nameRegisterInput.value,
            "email": emailRegisterInput.value,
            "password": passwordRegisterInput.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    };
    apiFetch(API_SOCIAL_REGISTER_URL, registerOption);
}

