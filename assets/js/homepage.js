console.log("homepage.js is loaded!");

//#region Variables

let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");


//#endregion


//#region Functions

/*  Function: getUserRepos()  
    => used to fetch the users github
    args: user 
    return: none
*/
let getUserRepos = function (user) {


    // format the github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        // request was successful
        if(response.ok) {
            response.json().then(function(data) {
                displayRepos(data,user);
                //console.log(data);
            });
        }  else {

            alert("Error: Github User Not Found");
        }
    })
    // catch for any other error
    .catch(function(error) {
        // notice this .catch() getting chained onto the end of the .then()
        alert("Unable to connect to GitHub");

    });
       
       
  
};

let displayRepos = function(repos, searchTerm) {
   // console.log(repos);
   // console.log(searchTerm);
   // check if the api returned any repos
   if (repos.length === 0) {
       repoContainerEl.textContent = "No repositories found.";
       return;
   }
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (let i = 0; i < repos.length; i++) {
        const element = repos[i];
        // format repo name
        let repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        let repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold repository name
        let titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create status element
        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
              "<i class= 'fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues.count + " issue(s)";
        
        }else {

            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        // append to the container
        repoEl.appendChild(statusEl);

        // append container to dom
        repoContainerEl.appendChild(repoEl);
        
    }

}


/*  Function: formSubmitHandler()  
    => used to get username
    args: event
    return: none
*/
let formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from the input element
    let username = nameInputEl.value.trim();


    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {

        alert("Please enter a Github username");
    }
    console.log(event);
}


//#endregion

//#region Listeners
userFormEl.addEventListener("submit", formSubmitHandler);

//#endregion



//#region Function Calls
getUserRepos();
//#endregion
