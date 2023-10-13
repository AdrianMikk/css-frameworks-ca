import { fetchAndDisplayPosts } from './posts.js';
import { displayFilteredPosts } from './posts.js';

// const accessToken = localStorage.getItem("accessToken");
const searchInput = document.getElementById("search");
// let postList = await fetchAndDisplayPosts();
// console.log(postList)

export async function search() {
    const postData = await fetchAndDisplayPosts();
    const searchValue = searchInput.value.toLowerCase();
    const filteredData = postData.filter((post) => post.title.toLowerCase().includes(searchValue));
    console.log(filteredData);
    // displayFilteredPosts(filteredData);
}
// search();