//div where profile info appears
const overview = document.querySelector(".overview");
//set value to github username
const username = "JacelynR";
//select the ul
const reposList = document.querySelector(".repo-list")

const gitUserProfile = async function() {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);

    const results = await userInfo.json();
    //console.log(results);
    displayUserInfo(results);
};
gitUserProfile();

const displayUserInfo = function(results) {
    const div = document.createElement("div");

    div.classList.add(".user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${results.avatar_url} />
        </figure>
        <div>
            <div>
                <p><strong>Name:</strong>${results.name}</p>
                <p><strong>Bio:</strong>${results.bio}</p>
                <p><strong>Location:</strong>${results.location}</p>
                <p><strong>Number of Public Repors:</strong>${results.public_repos}</p>
            </div>
        </div>
    `;
    overview.append(div);
    getRepos();
};

const getRepos = async function() {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

    const data = await fetchRepos.json();
    //console.log(data);

    showRepos(data);
};

const showRepos = function(repos) {

    for (let repo of repos) {
        const repoItem = document.createElement("li");

        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(repoItem);
    }
};