import { apiFetch } from "./components/apifetch.mjs";

const fullPostURL = "https://api.noroff.dev/api/v1/social/posts";
const postFeedContainer = document.getElementById("postFeed");
const fetchButton = document.getElementById("fetchButton");
const accessToken = localStorage.getItem("accessToken");
// console.log(accessToken);
const searchButton = document.getElementById("searchButton")

// Function to fetch and display posts
async function displayPosts() {
    const search = document.getElementById("search")

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    try {
        const postList = await apiFetch(fullPostURL, options);

        // Filter  (FIKSE FILTER) 

        // const filteredData = postList.filter((post) => post.tags.includes(filtered.value))

        // Search
        const searchedData = postList.filter((post) => post.title.includes(search.value))

        postFeedContainer.innerHTML = ""; // Clear previous posts

        // Loop through the posts and display them
        searchedData.forEach(({ title, body }) => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <h2>${title}</h2>
                <p>${body}</p>
            `;
            postFeedContainer.appendChild(postElement);
        });
    } catch (error) {
        console.log(error);
        postFeedContainer.innerHTML = "<p>Error fetching posts. Please try again later.</p>";
    }
}

fetchButton.addEventListener("click", displayPosts);

displayPosts();


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

