import { apiFetch } from './API/apiFetch.mjs';
import { displayFilteredPosts } from './posts.js';

const accessToken = localStorage.getItem("accessToken");
const searchInput = document.getElementById("search");
const fullPostURL = "https://api.noroff.dev/api/v1/social/posts?_author=true";

export async function search() {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const postData = await apiFetch(fullPostURL, options);
    const searchValue = searchInput.value.toLowerCase();
    const filteredData = postData.filter((post) => post.title.toLowerCase().includes(searchValue));
    displayFilteredPosts(filteredData);
}
