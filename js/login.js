const API_BASE_URL = "https://api.noroff.dev/api/v1";
const API_SOCIAL_REGISTER_PATH = "/social/auth/register";
const API_SOCIAL_REGISTER_URL = `${API_BASE_URL}${API_SOCIAL_REGISTER_PATH}`;
console.log(API_SOCIAL_REGISTER_URL);
const loginRegisterButton = document.querySelector("#login-register-btn");
// console.log(loginRegisterButton)


const fetchOptions = {
    method: "POST",
    body: JSON.stringify({
        "name": "adrian_mikkelsen#",
        "email": "adrmik99436@stud.noroff.no",
        "password": "adrianjs2",
    }),
    headers: {
        "Content-Type": "application/json",
    },
};

async function registerUser(url, userData, token) {
    const response = await fetch(url, userData);
    const result = await response.json();

    token(result);
};

function setToken(result) {
    if (result.accessToken) {
        localStorage.setItem("accessToken", result.accessToken);
        console.log(result.accessToken);
        window.location.href = "/profile/index.html"
    } else {
        console.error("Access token not found in the response.");
    }
}

// registerUser(API_SOCIAL_REGISTER_URL, fetchOptions);

const API_SOCIAL_LOGIN_PATH = "/social/auth/login";
const API_SOCIAL_LOGIN_URL = `${API_BASE_URL}${API_SOCIAL_LOGIN_PATH}`;


function loginEvent(event) {
    event.preventDefault();

    const emailInput = document.querySelector("#floatingInput");
    console.log(emailInput);
    const passwordInput = document.querySelector("#floatingPassword");
    console.log(passwordInput);

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

    registerUser(API_SOCIAL_LOGIN_URL, loginOption, setToken);

}


loginRegisterButton.addEventListener("click", loginEvent);



