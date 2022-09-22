//div where profile info appears
const overview = document.querySelector(".overview");
//set value to github username
const username = "JacelynR";

const gitUserProfile = async function() {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);

    const results = await userInfo.json();
    console.log(results);
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

};