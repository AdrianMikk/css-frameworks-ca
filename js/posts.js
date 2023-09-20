// // Mock data for posts
// let posts = [];

// // Function to create a new post
// function createPost() {
//     const postText = document.getElementById("post-text").value;

//     if (postText.trim() === "") {
//         alert("Please enter some text for your post.");
//         return;
//     }

//     const newPost = {
//         id: Date.now(),
//         text: postText,
//     };

//     posts.push(newPost);

//     // Clear the input field
//     document.getElementById("post-text").value = "";

//     // Display the new post
//     displayPosts();
// }

// // Function to delete a post
// function deletePost(id) {
//     posts = posts.filter((post) => post.id !== id);
//     displayPosts();
// }

// // Function to display posts
// function displayPosts() {
//     const postList = document.getElementById("post-list-items");
//     postList.innerHTML = "";

//     for (const post of posts) {
//         const listItem = document.createElement("li");
//         listItem.innerHTML = `
//             <p>${post.text}</p>
//             <button onclick="deletePost(${post.id})">Delete</button>
//         `;
//         postList.appendChild(listItem);
//     }
// }

// // Initial display of posts
// displayPosts();
