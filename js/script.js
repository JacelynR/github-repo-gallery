const overview = document.querySelector(".overview");
const username = "JacelynR";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const repoButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos")


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
            <p><strong>Name:</strong>${results.name}</p>
            <p><strong>Bio:</strong>${results.bio}</p>
            <p><strong>Location:</strong>${results.location}</p>
            <p><strong>Number of Public Repors:</strong>${results.public_repos}</p>
        </div>
    `;
    overview.append(div);
    getRepos(username);
};

const getRepos = async function(username) {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

    const data = await fetchRepos.json();
    //console.log(data);

    showRepos(data);
};

const showRepos = function(repos) {
    filterInput.classList.remove("hide");

    for (let repo of repos) {
        const repoItem = document.createElement("li");

        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;

        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function(repoName) {
    const getInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getInfo.json();
    //console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for (let language in languageData) {
        languages.push(language);
        //console.log(languages);
    }
   
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function(repoInfo, languages) {
    repoButton.classList.remove("hide");
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    repoData.innerHTML = "";

    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.deafult_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a 
                class="visit" 
                href="${repoInfo.html_url}
                target="_blank"
                rel="noreferrer noopener"
            >
                View Repo on GitHub!
            </a>
    `;
    repoData.append(div);
};

repoButton.addEventListener("click", function() {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    repoButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowercase = searchText.toLowerCase();

    for (let repo of repos) {
        const repoLowercase = repo.innerText.toLowerCase();

        if (repoLowercase.includes(searchLowercase)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});