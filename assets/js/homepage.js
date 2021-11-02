console.log("homepage.js is loaded!");

//#region Variables


//#endregion


//#region Functions

/*  Function: getUserRepos()  
    => used to handle the button clicks
    args: none
    return: none
*/


let getUserRepos = function () {
    console.log("getUserRepos was called");
    fetch("https://api.github.com/users/octocat/repos");
};

//#endregion
















//#region Function Calls




getUserRepos();
//#endregion
