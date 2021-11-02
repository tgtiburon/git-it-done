console.log("homepage.js is loaded!");

//#region Variables


//#endregion


//#region Functions

/*  Function: getUserRepos()  
    => used to handle the button clicks
    args: none
    return: none
*/


let getUserRepos = function (user) {


    // format the github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

//#endregion
















//#region Function Calls




getUserRepos();
//#endregion
