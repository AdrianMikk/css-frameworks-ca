import { fetchAndDisplayPosts } from "../posts.js";
import { apiFetch } from "../API/apiFetch.mjs";

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
            fetchAndDisplayPosts();
            createPostForm.reset();
        } else {
            alert("Failed to create the post.");
        }
    } catch (error) {
        console.error(error);
        alert("Error creating the post.");
    }
}

const createPostFormSubmit = (e) => {
    e.preventDefault();

    const title = newPostTitleInput.value;
    const body = newPostBodyInput.value;
    const media = newPostImageInput.value;

    const newPostData = {
        title,
        body,
        media,
    };

    fetch(fullPostURL, options)
        .then((response) => response.json())
        .then((data) => {
            if (data.id) {
                postModal.style.display = "none";
                createPostForm.removeEventListener("submit", createPostFormSubmit);
                const event = new Event('refreshPosts');
                document.dispatchEvent(event);
            } else {
                alert("Failed to create a new post.");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Failed to create a new post.");
        });
};

createPostForm.addEventListener("submit", createPostFormSubmit);
