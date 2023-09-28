import { loginEvent } from "./components/login.mjs";
import { registerEvent } from "./components/register.mjs";
const loginRegisterButton = document.querySelector("#login-register-btn");
const registerButton = document.querySelector("#register-btn");

const API_BASE_URL = "https://api.noroff.dev";

loginRegisterButton.addEventListener("click", loginEvent);
registerButton.addEventListener("click", registerEvent);