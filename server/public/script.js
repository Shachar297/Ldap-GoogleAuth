// HTML Decelerations
var btn = document.getElementById("googleGo"),
    userInput = document.getElementById("userInput"),
    pairBtn = document.getElementById("pairBtn"),
    validateBtn = document.getElementById("validateBtn"),
    googleImg = document.getElementById("googleImg"),
    googleLinkA = document.getElementById("googleLinkA"),
    validateInput = document.getElementById("validateInput"),
    validateDiv = document.getElementById("validateDiv"),
    userPassword = document.getElementById("userPassword"),
    userOutput = document.getElementById("userOutput"),
    loginDiv = document.getElementById("login-content"),
    pairDiv = document.getElementById("pairDiv"),
    validateDiv = document.getElementById("validateDiv");


// Initializing Styles dynamically.
initStyles();

let isLoggedIn = false;

btn.addEventListener("click", () => {
    onGoogleAuth(userInput, userPassword, pairBtn, validateBtn, validateInput, btn);
});

pairBtn.addEventListener("click", () => {
    googlePair(googleImg, validateDiv)
});

validateBtn.addEventListener("click", () => {
    googleValidate(validateInput, userOutput);
})

function onGoogleAuth(userInput, userPassword) {
    const user = {
        username: userInput.value,
        password: userPassword.value
    }
    fetch(`http://localhost:3333/ldap/`, {
        method: "POST",
        headers: {
            // "User-Agent": configTest.userAgent,
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)
    }).then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`)
        if (response.status == 200) {
            let didLoggedIn = 'true';
            onLoginHandleStyles(didLoggedIn)

        }
        return response.text()
    }).catch(err => {
        alert(err)
    })
}

function showValidateDivAfterPair(validateDiv) {
    setInterval(() => validateDiv.style.display = "block", 2000);
}

function hideMainPageIfLoggedIn(input, btn) {
    input.style.display = 'none';
    btn.style.display = 'none';
    loginDiv.style.display = 'none';
}

function displayOrHideButton(bool, pairBtn, validateBtn) {
    pairBtn.style.display = bool == "false" ? "none" : "block";
    validateBtn.style.display = bool == "false" ? "none" : "block";
    validateInput.style.display = bool == "false" ? "none" : "block";
}

function googlePair(googleImg) {

    fetch(`http://localhost:3333/users/`, {
        method: "POST",
        headers: {
            // "User-Agent": configTest.userAgent,
            "Content-Type": "application/json"
        },

    }).then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`)
        return response.text()
    }).then(text => {
        onPairHandleStyles(text)
    }).catch(err => {
        alert(`Error: ${err.message}`)
    })
}

function googleValidate(validateInput, userOutput) {
    const pin = { validatePin: validateInput.value }
    fetch("http://localhost:3333/users/pin/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(pin)

    }).then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`)
        return response.text()
    }).then(text => {
        onValidate(text)
    }).catch(err => {
        alert(err)
    })
}


function showUseroutput(userOutput, result) {
    userOutput.classList.add(result == 'True' ? 'alert-success' : 'alert-failure')
     userOutput.style.display = "block";
}

function initStyles() {
    googleImg.style.display = "none";
    pairBtn.style.display = "none";
    validateBtn.style.display = "none";
    validateInput.style.display = "none";
    validateDiv.style.display = "none";
    userOutput.style.display = "none";
}

function onLoginHandleStyles(didLoggedIn) {
    displayOrHideButton(didLoggedIn, pairBtn, validateBtn, validateInput)
    //hideMainPageIfLoggedIn(userInput, btn)
    console.log(didLoggedIn, "RESSSS")
    userPassword.style.display = "none";
}

function onPairHandleStyles(text) {
    googleImg.style.display = "block";
    text = JSON.parse(text);
    text = text.split('<')[2].split("'")[1]
    console.log(text)
    googleImg.src = text
    console.log(googleImg.attributes);
    showValidateDivAfterPair(validateDiv)
    pairBtn.style.display = "none";
}


function onValidate(text) {
    console.log(text)
        showUseroutput(userOutput, text)

}