import { apiFetch } from "./components/apifetch.mjs";

const fullPostURL = "https://api.noroff.dev/api/v1/social/posts";
const postFeedContainer = document.getElementById("postFeed");
const searchInput = document.getElementById("search");

// Add the event listener here
searchInput.addEventListener("input", () => {
    displayFilteredPosts(); // Call the filtering function when the input changes
});

const createPostForm = document.getElementById("createPostForm");
const fetchButton = document.getElementById("fetchButton");
const accessToken = localStorage.getItem("accessToken");
let postList = [];

// Cache DOM elements for better performance
const newPostTitleInput = document.getElementById("newPostTitle");
const newPostBodyInput = document.getElementById("newPostBody");

// Create an edit form and cache its elements
const editPostForm = document.getElementById("editPostForm");
const editPostTitleInput = document.getElementById("editPostTitle");
const editPostBodyInput = document.getElementById("editPostBody");

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

// Function to filter and display posts
function displayFilteredPosts() {
    const searchValue = searchInput.value.toLowerCase();
    const filteredData = postList.filter((post) => post.title.toLowerCase().includes(searchValue));

    postFeedContainer.innerHTML = "";

    filteredData.forEach(({ id, title, body, media }) => {
        const postCard = document.createElement("div");
        postCard.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");
        const imageUrl = media ? media : "https://via.placeholder.com/300";
        postCard.id = id;

        postCard.innerHTML = `
            <div class="card">
                <img src="${imageUrl}" alt="${title}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${body}</p>
                    <button class="btn btn-primary view-post" data-post-id="${id}">View Post</button>
                    <button class="btn btn-primary edit-post" data-post-id="${id}">Edit Post</button>
                    <button class="btn btn-danger delete-post" data-post-id="${id}">Delete Post</button>
                </div>
            </div>
        `;

        postFeedContainer.appendChild(postCard);
    });

    addViewPostListeners();
    addEditPostListeners();
    addDeletePostListeners();
}

// Function to add click event listeners to view post buttons
function addViewPostListeners() {
    const viewPostButtons = document.querySelectorAll(".view-post");
    viewPostButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const postId = e.target.getAttribute("data-post-id");
            console.log(typeof postId); // Log the post ID to the console
            const post = postList.find((post) => post.id === parseInt(postId));
            console.log(post); // Log the post object to the console
            if (post) {
                // modal.style.display = "block";
                // ...
            } else {
                alert("Post not found.");
            }
        });
    }
    )
};

// Close the modal when the close button is clicked
const closeModalButton = document.getElementById("closeModalButton");
closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
});


// Function to add click event listeners to edit post buttons
function addEditPostListeners() {
    const editPostButtons = document.querySelectorAll(".edit-post");
    editPostButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const postId = e.target.getAttribute("data-post-id");
            populateEditForm(postId);
        });
    });
}

// Function to populate the edit form with post data
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

// Function to send a PUT request to update a post
async function updatePost(postId) {
    const title = editPostTitleInput.value;
    const body = editPostBodyInput.value;

    const updatedPostData = {
        title,
        body,
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

// Function to add click event listeners to delete post buttons
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

// Function to send a DELETE request to delete a post
async function deletePost(postId) {
    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    try {
        const response = await apiFetch(`${fullPostURL}/${postId}`, options);

        if (response && response.message === "Post deleted successfully") {
            alert("Post deleted successfully!");
            fetchAndDisplayPosts();
        } else {
            alert("Failed to delete the post.");
        }
    } catch (error) {
        console.error(error);
        alert("Error deleting the post.");
    }
}

// Event listeners
fetchButton.addEventListener("click", fetchAndDisplayPosts);
createPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createNewPost();
});

fetchAndDisplayPosts();




