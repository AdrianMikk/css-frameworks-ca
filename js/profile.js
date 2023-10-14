import { apiFetch } from "./API/apiFetch.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1";
const accessToken = localStorage.getItem("accessToken");
const name = "";
const userId = localStorage.getItem("name");

async function fetchProfile() {
    if (!accessToken) {
        location.href = "/index.html";
        return;
    }
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const postList = await apiFetch(API_BASE_URL + `/social/profiles/${userId}`, options);
        displayUser(postList)
    } catch (error) {
        console.error(error);
        alert("Failed to fetch profile.");
    }
}

fetchProfile();

function displayUser(user) {
    const userName = document.getElementById("userName");
    const userAvatar = document.getElementById("userAvatar");
    const postCount = document.getElementById("postCount");
    const followerCount = document.getElementById("followerCount");
    const followingCount = document.getElementById("followingCount");

    userName.innerText = `${user.name}`
    if (!user.avatar) {
        userAvatar.src = "https://cdn-icons-png.flaticon.com/512/666/666201.png"
    } else {
        userAvatar.src = `${user.avatar}`
    }
    postCount.innerText = `${user._count.posts}`
    followerCount.innerText = `${user._count.followers}`
    followingCount.innerText = `${user._count.following}`
}

function logOutUser() {
    const logOutBtn = document.getElementById("logOut")
    logOutBtn.addEventListener("click", () => {
        localStorage.clear()
    })
}
logOutUser();