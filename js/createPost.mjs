// import { fetchAndDisplayPosts } from "./posts.js";
// import { apiFetch } from "./API/apiFetch.mjs";

// const fullPostURL = "https://api.noroff.dev/api/v1/social/posts";

// /**
//  * Create a new post by sending a POST request to the API.
//  *
//  * @param {Object} options - The options for the POST request, including headers and request data.
//  * @throws {Error} Throws an error if the POST request fails.
//  */
// export async function createNewPost(options) {
//     try {
//         const response = await apiFetch(fullPostURL, options);

//         if (response && response.id) {
//             alert("Post created successfully!");
//             fetchAndDisplayPosts(); // Refresh the post list
//             createPostForm.reset(); // Reset the form
//         } else {
//             alert("Failed to create the post.");
//         }
//     } catch (error) {
//         console.error(error);
//         alert("Error creating the post.");
//     }
// }