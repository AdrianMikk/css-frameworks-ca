// import { apiFetch } from "./components/apifetch.mjs";

// const fullPostURL = "https://api.noroff.dev/api/v1/social/posts";
// const postFeedContainer = document.getElementById("postFeed");
// const searchForm = document.getElementById("searchForm");
// const accessToken = localStorage.getItem("accessToken");
// // console.log(accessToken);
// const searchButton = document.getElementById("searchButton")

// // Function to fetch and display posts
// async function displayPosts() {
//     const search = document.getElementById("search")

//     const options = {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     }
//     try {
//         const postList = await apiFetch(fullPostURL, options);

//         // Filter  (FIKSE FILTER) 

//         // const filteredData = postList.filter((post) => post.tags.includes(filtered.value))

//         // Search
//         const searchedData = postList.filter((post) => post.title.includes(search.value))

//         searchForm.addEventListener("submit", (e) => {
//             e.preventDefault()
//             displayPosts()
//         })

//         postFeedContainer.innerHTML = ""; // Clear previous posts

//         // Loop through the posts and display them
//         searchedData.forEach(({ title, body }) => {
//             const postElement = document.createElement("div");
//             postElement.classList.add("post");
//             postElement.innerHTML = `
//                 <h2>${title}</h2>
//                 <p>${body}</p>
//             `;
//             postFeedContainer.appendChild(postElement);
//         });
//     } catch (error) {
//         console.log(error);
//         postFeedContainer.innerHTML = "<p>Error fetching posts. Please try again later.</p>";
//     }
// }

// fetchButton.addEventListener("click", displayPosts);

// displayPosts();

import { apiFetch } from "./components/apifetch.mjs";

const fullPostURL = "https://api.noroff.dev/api/v1/social/posts";
const postFeedContainer = document.getElementById("postFeed");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("search");
const accessToken = localStorage.getItem("accessToken");
const fetchButton = document.getElementById("fetchButton");

let postList = []; // Store the fetched posts

async function fetchPosts() {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    try {
        postList = await apiFetch(fullPostURL, options);
    } catch (error) {
        console.log(error);
        postList = [];
    }
}

// Function to filter and display posts
function displayFilteredPosts() {
    const searchValue = searchInput.value.toLowerCase();

    const filteredData = postList.filter((post) => post.title.toLowerCase().includes(searchValue));

    // Clear 
    postFeedContainer.innerHTML = "";

    // Loop through the filtered posts and create Bootstrap cards with images
    filteredData.forEach(({ title, body, media }) => {
        const postCard = document.createElement("div");
        postCard.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");

        // Check if media is null or an empty string
        const imageUrl = media ? media : "https://via.placeholder.com/300";

        postCard.innerHTML = `
            <div class="card">
                <img src="${imageUrl}" alt="${title}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${body}</p>
                </div>
            </div>
        `;

        postFeedContainer.appendChild(postCard);
    });
}

fetchButton.addEventListener("click", () => {
    fetchPosts();
    displayFilteredPosts();
});

fetchPosts();
displayFilteredPosts();

searchInput.addEventListener("input", displayFilteredPosts);




// ID

// async function idEvent(event) {
//     event.preventDefault();

//     const emailInput = document.querySelector("#floatingInput");
//     // console.log(emailInput);
//     const passwordInput = document.querySelector("#floatingPassword");
//     // console.log(passwordInput);

//     const idOption = {
//         method: "POST",
//         body: JSON.stringify({
//             "email": emailInput.value,
//             "password": passwordInput.value,
//         }),
//         headers: {
//             "Content-Type": "application/json",
//         },
//     };

// const result = await apiFetch(API_SOCIAL_LOGIN_URL, loginOption);

// setToken(result);

// };

