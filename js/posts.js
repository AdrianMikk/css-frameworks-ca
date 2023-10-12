import { apiFetch } from "./API/apiFetch.mjs";
import { createNewElement } from "./utils/createNewElement.mjs";
import { createNewPost } from "./createPost.mjs";
import { addEditPostListeners } from "./editposts.js";
import { addDeletePostListeners } from "./deletePost.js";


const fullPostURL = "https://api.noroff.dev/api/v1/social/posts";
const postFeedContainer = document.getElementById("postFeed");
const searchInput = document.getElementById("search");

const newPostTitleInput = document.getElementById("newPostTitle");
const newPostBodyInput = document.getElementById("newPostBody");
const newPostImageInput = document.getElementById("newPostImageInput");

const editPostButton = document.querySelector(".edit-post")
const viewPostButton = document.getElementById("viewPostButton");
const deleteButton = document.getElementById("deleteButton");


// Add the event listener here
searchInput.addEventListener("input", () => {
    displayFilteredPosts(); // Call the filtering function when the input changes
});

const createPostForm = document.getElementById("createPostForm");
// const fetchButton = document.getElementById("fetchButton");
const accessToken = localStorage.getItem("accessToken");
const loggedInEmail = localStorage.getItem("email");
const loggedInName = localStorage.getItem("name");
let postList = [];

// Create an edit form and cache its elements
const editPostForm = document.getElementById("editPostForm");
const editPostTitleInput = document.getElementById("editPostTitle");
const editPostBodyInput = document.getElementById("editPostBody");

// Modal
const postModal = document.getElementById("postModal");
const editPostModal = document.getElementById("editPostModal");

// Fetch posts and display them
export async function fetchAndDisplayPosts() {
    if (!accessToken) {
        location.href = "/index.html";
    }
    try {
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        postList = await apiFetch(fullPostURL + `?_author=true`, options);
        console.log(postList)
        displayFilteredPosts();
    } catch (error) {
        console.error(error);
        alert("Failed to fetch posts.");
    }
}


/**
 * Filter and display posts based on the search input value.
 */
function displayFilteredPosts(filterMethod) {
    const searchValue = searchInput.value.toLowerCase();
    const filteredData = postList.filter((post) => post.title.toLowerCase().includes(searchValue));

    postFeedContainer.innerHTML = "";

    filteredData.forEach(({ id, title, body, media, author }) => {
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
        if (author.name === loggedInName) {
            cardBodyDiv.appendChild(editButton);
            cardBodyDiv.appendChild(deleteButton);
        }
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
                    postModal.style.display = "block";
                } else {
                    alert("Post not found.");
                }
            });
        });
    }

    const closeModalButton = document.getElementById("closeModalButton");
    closeModalButton.addEventListener("click", () => {
        postModal.style.display = "none";
    });

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
    })
};
// editPostButton.addEventListener("click", addEditPostListeners);

fetchAndDisplayPosts();