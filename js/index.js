// const users = [
//     { email: 'user1@noroff.no', password: 'password1', username: 'User1' },
// ];

// function registerUser(email, password, username) {
//     // Validate input and add user to the users array
// }

// // User login
// function loginUser(email, password) {
//     // Verify login credentials
// }

// Get the form and message elements
// const form = document.getElementById('registration-form');
// const message = document.getElementById('message');

// // Add a submit event listener to the form
// form.addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the form from submitting

//     // Get the value of the email input field
//     const emailInput = document.getElementById('email');
//     const email = emailInput.value.trim();

//     // Check if the email ends with "@noroff.no" or "@stud.noroff.no"
//     if (email.endsWith('@noroff.no') || email.endsWith('@stud.noroff.no')) {
//         message.textContent = 'Registration successful!';
//         // Here, you can submit the form data to your server or perform further actions.
//     } else {
//         message.textContent = 'Invalid email. Please use a valid @noroff.no or @stud.noroff.no email address.';
//     }
// });

const API_BASE_URL = "https://api.noroff.dev";
const postsURL = `${API_BASE_URL}/api/v1/social/posts?_comments=true&_author=true&_reactions=true&_count=true&_limit=20&_sort=createdAt:desc`;
const token = localStorage.getItem("accessToken");
const fetchOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
};

// End-points: 
// Register: /api/v1/social/auth/register
// Login: /api/v1/social/auth/login
// Get All Posts: /api/v1/social/posts

// Registers user //

/**
 * 
 * @param {string} url 
 * @param {any} userData 
 * ```js
 *  registerUser(registerUrl, userToRegister);
 * ```
 */

async function registerUser(url, userData) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}

const userToRegister = {
    "name": "adrian_mikkelsen",
    "email": "adrmik99436@stud.noroff.no",
    "password": "adrianjs2",
};

const registerUrl = `${API_BASE_URL}/api/v1/social/auth/register`;


// registerUser(registerUrl, userToRegister);

// Login user //

async function loginUser(url, userData) {
    try {

        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);
        const accessToken = json.accessToken;
        localStorage.setItem('accessToken', accessToken);
    } catch (error) {
        console.log(error);
    }
};

const userToLogin = {
    "email": "adrmik99436@stud.noroff.no",
    "password": "adrianjs2",
};

const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`;

// loginUser(loginUrl, userToLogin);

// Request with token // 

async function getWithToken(url) {
    try {
        console.log(url);
        const token = localStorage.getItem('accessToken');
        console.log(token);
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, fetchOptions);
        console.log(response);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}

const postsUrl = `${API_BASE_URL}/api/v1/social/posts`;

getWithToken(postsURL);