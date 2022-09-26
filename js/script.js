const overview = document.querySelector(".overview");
const username = "JacelynR";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");


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
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for (let language in languageData) {
        languages.push(language);
        console.log(languages);
    }
   

};

const displayRepoInfo = function(repoInfo, languages) {
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

    repoData.classList.remove("hide");
    repoSection.classList.add("hide");

    repoData.append(div);
};

