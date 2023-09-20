import { API_BASE_URL } from "./variables/consts.js";

// document.addEventListener('DOMContentLoaded', () => {
//     const registrationForm = document.getElementById('registrationForm');
//     const usernameInput = document.getElementById('username');
//     const emailInput = document.getElementById('email'); // Add an email input field
//     const usernameError = document.getElementById('usernameError');
//     const emailError = document.getElementById('emailError'); // Add an email error element

//     // Function to validate username availability
//     const validateUsername = async () => {
//         // Your existing username validation code here...
//     };

//     // Function to validate email format
//     const validateEmail = () => {
//         const email = emailInput.value.trim();
//         const emailPattern = /^[a-zA-Z0-9._-]+@(noroff\.no|stud\.noroff\.no)$/;

//         if (!emailPattern.test(email)) {
//             emailError.textContent = 'Valid email addresses: user@noroff.no or user@stud.noroff.no';
//             return false;
//         } else {
//             emailError.textContent = '';
//             return true;
//         }
//     };

//     registrationForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const isUsernameValid = await validateUsername();
//         const isEmailValid = validateEmail();

//         if (isUsernameValid && isEmailValid) {
//             // Submit the form if both username and email are valid
//             registrationForm.submit();
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const checkEmailBtn = document.getElementById('check-email-btn');

    checkEmailBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();

        if (email === '') {
            emailError.textContent = 'Email cannot be empty';
            return;
        }

        // Send a GET request to check the email
        try {
            const response = await fetch(`https://api.example.com/check-email?email=${email}`);
            const data = await response.json();

            if (data.isNoroffEmail) {
                emailError.textContent = 'You can register with this email.';
            } else {
                emailError.textContent = 'You cannot register with this email.';
            }
        } catch (error) {
            // Handle network errors
            emailError.textContent = 'Network error occurred';
        }
    });
});


