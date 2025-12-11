// Owner email
const ownerEmail = "dzahdavid72@gmail.com";

// Save posts to localStorage
function uploadMusic() {
    const fileInput = document.getElementById("musicFile");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a music file.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const url = e.target.result;

        const posts = JSON.parse(localStorage.getItem("musicPosts") || "[]");

        posts.push({
            name: file.name,
            url: url,
        });

        localStorage.setItem("musicPosts", JSON.stringify(posts));
        loadPosts();
    };

    reader.readAsDataURL(file);
}

// Display posts
function loadPosts() {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";

    const posts = JSON.parse(localStorage.getItem("musicPosts") || "[]");

    posts.forEach((post, index) => {
        const div = document.createElement("div");
        div.className = "music-item";
        div.innerHTML = `
            <h3>${post.name}</h3>
            <audio controls src="${post.url}"></audio>
            <br><br>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        postsContainer.appendChild(div);
    });
}

// Delete post
function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem("musicPosts") || "[]");
    posts.splice(index, 1);
    localStorage.setItem("musicPosts", JSON.stringify(posts));
    loadPosts();
}

// Load posts on page start
window.onload = loadPosts;
