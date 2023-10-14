import { apiFetch } from "./API/apiFetch.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1";
const accessToken = localStorage.getItem("accessToken");
const name = "";

async function fetchProfile() {
    if (!accessToken) {
        location.href = "/index.html";
        return; // Add a return statement to exit the function
    }
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const postList = await apiFetch(API_BASE_URL + `/social/profiles/${name}`, options);
    } catch (error) {
        console.error(error);
        alert("Failed to fetch profile.");
    }
}

fetchProfile();
