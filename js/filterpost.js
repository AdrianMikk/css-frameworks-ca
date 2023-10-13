//     // Filter posts by date
//    export async function filterPost() {
//         const dropdownMenu = document.getElementById("dropdownMenu");
//         const filterNewPost = document.getElementById("newestPost");
//         const filterOldPost = document.getElementById("oldestPost");
//         filterNewPost.addEventListener("click", (e) => {
//             fetchAndDisplayPosts()
//         }
//         )
//         filterOldPost.addEventListener("click", (e) => {
//             const postsDesc = data.sort(
//                 (a, b) => new Date(a.created) - new Date(b.created))
//             console.log(postsDesc)
//             displayFilteredPosts(postsDesc);
//         }
//         )
//     };
//     filterPost();