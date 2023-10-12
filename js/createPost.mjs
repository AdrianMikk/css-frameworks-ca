import { fetchAndDisplayPosts } from "./posts.js";
import { apiFetch } from "./API/apiFetch.mjs";

const fullPostURL = "https://api.noroff.dev/api/v1/social/posts";
const accessToken = localStorage.getItem("accessToken");

const newPostTitleInput = document.getElementById("newPostTitle");
const newPostBodyInput = document.getElementById("newPostBody");
const newPostImageInput = document.getElementById("newPostImageInput");

// /**
//  * Create a new post by sending a POST request to the API.
//  *
//  * @param {Object} options - The options for the POST request, including headers and request data.
//  * @throws {Error} Throws an error if the POST request fails.
//  */
export async function createNewPost(options) {
    try {
        const response = await apiFetch(fullPostURL, options);

        if (response && response.id) {
            alert("Post created successfully!");
            fetchAndDisplayPosts(); // Refresh the post list
            createPostForm.reset(); // Reset the form
        } else {
            alert("Failed to create the post.");
        }
    } catch (error) {
        console.error(error);
        alert("Error creating the post.");
    }
}

// Get the values of the title and body inputs
const title = newPostTitleInput.value;
const body = newPostBodyInput.value;
const media = newPostImageInput.value;


// Create an object with the new post data
const newPostData = {
    title,
    body,
    media,
};

// Define the options for the POST request
const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(newPostData),
};
