import { apiFetch } from "./API/apiFetch.mjs";
import { createNewElement } from "./utils/createNewElement.mjs";

const fullPostURL = "https://api.noroff.dev/api/v1/social/posts";
const postFeedContainer = document.getElementById("postFeed");
const searchInput = document.getElementById("search");

// Add the event listener here
searchInput.addEventListener("input", () => {
    displayFilteredPosts(); // Call the filtering function when the input changes
});

const createPostForm = document.getElementById("createPostForm");
// const fetchButton = document.getElementById("fetchButton");
const accessToken = localStorage.getItem("accessToken");
let postList = [];

// Cache DOM elements for better performance
const newPostTitleInput = document.getElementById("newPostTitle");
const newPostBodyInput = document.getElementById("newPostBody");
const newPostImageInput = document.getElementById("newPostImageInput");

// Create an edit form and cache its elements
const editPostForm = document.getElementById("editPostForm");
const editPostTitleInput = document.getElementById("editPostTitle");
const editPostBodyInput = document.getElementById("editPostBody");
const editPostImageInput = document.getElementById("editPostImage");

// Modal
const modal = document.getElementById("postModal");

// Fetch posts and display them
async function fetchAndDisplayPosts() {
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        postList = await apiFetch(fullPostURL, options);
        displayFilteredPosts();
    } catch (error) {
        console.error(error);
        alert("Failed to fetch posts.");
    }
}


/**
 * Filter and display posts based on the search input value.
 */
function displayFilteredPosts() {
    const searchValue = searchInput.value.toLowerCase();
    const filteredData = postList.filter((post) => post.title.toLowerCase().includes(searchValue));

    postFeedContainer.innerHTML = "";

    filteredData.forEach(({ id, title, body, media }) => {
        const postCard = document.createElement("div");
        postCard.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");
        const imageUrl = media ? media : "https://via.placeholder.com/300";
        postCard.id = id;

        // Create the outer div element with the "card" class
        const cardDiv = createNewElement("div", { class: "card" })

        // Create the image element
        const image = createNewElement("img", { src: imageUrl, alt: title, class: "card-img-top" });

        // Create the card body div
        const cardBodyDiv = createNewElement("div", { class: "card-body" });

        // Create the title element
        const titleElement = createNewElement("h5", { class: "card-title", textContent: title });

        // Create the body element
        const bodyElement = createNewElement("p", { class: "card-text", textContent: body });

        // Create the "View Post" button
        const viewButton = createNewElement("button", {
            class: "btn btn-primary view-post",
            "data-post-id": id,
            textContent: "View Post",
        });

        // Create the "Edit Post" button
        const editButton = createNewElement("button", {
            class: "btn btn-primary edit-post",
            "data-post-id": id,
            textContent: "Edit Post",
        });

        // Create the "Delete Post" button
        const deleteButton = createNewElement("button", {
            class: "btn btn-danger delete-post",
            "data-post-id": id,
            textContent: "Delete Post",
        });

        // Append all the elements to build the card
        cardBodyDiv.appendChild(titleElement);
        cardBodyDiv.appendChild(bodyElement);
        cardBodyDiv.appendChild(viewButton);
        cardBodyDiv.appendChild(editButton);
        cardBodyDiv.appendChild(deleteButton);

        cardDiv.appendChild(image);
        cardDiv.appendChild(cardBodyDiv);

        // Add the card to the postCard element or wherever you want it in your DOM
        postCard.appendChild(cardDiv);

        postFeedContainer.appendChild(postCard);
    });

    addViewPostListeners();
    addEditPostListeners();
    addDeletePostListeners();


    /**
     * Add click event listeners to "View Post" buttons.
     * When a button is clicked, display the post content or handle accordingly.
     */
    function addViewPostListeners() {
        const viewPostButtons = document.querySelectorAll(".view-post");
        viewPostButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const postId = e.target.getAttribute("data-post-id");
                // displayPostInModal(postId);
                console.log(postId);
                const post = postList.find((post) => post.id === parseInt(postId));
                console.log(post); // Log the post object to the console
                if (post) {
                    const modalTitle = document.getElementById("modalTitle");
                    const modalBody = document.getElementById("modalBody");
                    const modalImage = document.getElementById("modalImage");
                    const postIdElement = document.getElementById("postId");
                    postIdElement.textContent = "Post ID: " + postId;
                    modalTitle.textContent = post.title;
                    modalBody.textContent = post.body;
                    modalImage.src = post.media;
                    modal.style.display = "block";
                } else {
                    alert("Post not found.");
                }
            });
        });
    }

    const closeModalButton = document.getElementById("closeModalButton");
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });


    /**
     * Add click event listeners to "Edit Post" buttons.
     * When a button is clicked, populate the edit form with the post data.
     */
    function addEditPostListeners() {
        const editPostButtons = document.querySelectorAll(".edit-post");
        editPostButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const postId = e.target.getAttribute("data-post-id");
                populateEditForm(postId);
            });
        });
    }

    /**
     * Populate the edit form with post data based on the given post ID.
     * @param {number} postId - The ID of the post to populate the form with.
     */
    function populateEditForm(postId) {
        const post = postList.find((post) => post.id === postId);
        if (post) {
            editPostTitleInput.value = post.title;
            editPostBodyInput.value = post.body;
            editPostForm.style.display = "block";
            editPostForm.addEventListener("submit", (e) => {
                e.preventDefault();
                updatePost(postId);
            });
        } else {
            alert("Post not found.");
        }
    }

    /**
     * Update a post with the provided data.
     * @param {number} postId - The ID of the post to update.
     */
    async function updatePost(postId) {
        const title = editPostTitleInput.value;
        const body = editPostBodyInput.value;
        const media = editPostImageInput.value;

        const updatedPostData = {
            title,
            body,
            media,
        };

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(updatedPostData),
        };

        try {
            const response = await apiFetch(`${fullPostURL}/${postId}`, options);

            if (response && response.id) {
                alert("Post updated successfully!");
                fetchAndDisplayPosts(); // Refresh the post list
                editPostForm.style.display = "none"; // Hide the edit form
            } else {
                alert("Failed to update the post.");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating the post.");
        }
    }

    /**
     * Add click event listeners to "Delete Post" buttons.
     * When a button is clicked, prompt the user for confirmation and delete the post if confirmed.
     */
    function addDeletePostListeners() {
        const deletePostButtons = document.querySelectorAll(".delete-post");
        deletePostButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const postId = e.target.getAttribute("data-post-id");
                if (confirm("Are you sure you want to delete this post?")) {
                    deletePost(postId);
                }
            });
        });
    }

    /**
     * Delete a post with the provided post ID.
     * @param {number} postId - The ID of the post to delete.
     */
    async function deletePost(postId) {
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            const response = await apiFetch(`${fullPostURL}/${postId}`, options);

            if (response) {
                alert("Post deleted successfully!");
                fetchAndDisplayPosts();
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting the post.");
        }
    }

    // Event listeners
    // fetchButton.addEventListener("click", fetchAndDisplayPosts);

    // Add an event listener for the form submission
    createPostForm.addEventListener("submit", (e) => {
        e.preventDefault();

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

        // Send the POST request to create a new post
        createNewPost(options);
    });

    /**
     * Create a new post by sending a POST request to the API.
     *
     * @param {Object} options - The options for the POST request, including headers and request data.
     * @throws {Error} Throws an error if the POST request fails.
     */
    async function createNewPost(options) {
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
}

fetchAndDisplayPosts();