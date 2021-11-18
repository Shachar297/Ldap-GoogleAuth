// HTML Declerations
var btn = document.getElementById("googleGo"),
 userInput = document.getElementById("userInput"),
 pairBtn = document.getElementById("pairBtn"),
 validateBtn = document.getElementById("validateBtn"),
 googleImg = document.getElementById("googleImg"),
 googleLinkA = document.getElementById("googleLinkA"),
 validateInput = document.getElementById("validateInput"),
 validateDiv = document.getElementById("validateDiv"),
 userPassword = document.getElementById("userPassword"),
 userOutput = document.getElementById("userOutput");

// Initializing Styles dynamicly.
googleImg.style.display = "none";
pairBtn.style.display = "none";
validateBtn.style.display = "none";
validateInput.style.display = "none";
validateDiv.style.display = "none";
userOutput.style.display = "none";

let isLoggedIn = false;

btn.addEventListener("click", () => {
    onGoogleAuth(userInput,userPassword, pairBtn, validateBtn, validateInput, btn);
});

pairBtn.addEventListener("click", () => {
    googlePair(googleImg, validateDiv)
});

validateBtn.addEventListener("click", () => {
    googleValidate(validateInput, userOutput);
})

function onGoogleAuth(userInput,userPassword, pairBtn, validateBtn, validateInput, btn) {
    const user = { username: userInput.value ,
                   password : userPassword.value}
    fetch(`http://localhost:3333/ldap/`, {
        method: "POST",
        headers: {
            // "User-Agent": configTest.userAgent,
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)
    }).then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`)
        if(response.status == 200) {
            console.log("23000000")
            let didLoggedIn = 'true';
            displayOrHidBeutton(didLoggedIn, pairBtn, validateBtn, validateInput)
            hideMainPageIfLoggedIn(userInput, btn)
            console.log(didLoggedIn , "RESSSS")
            userPassword.style.display = "none";
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
}

function displayOrHidBeutton(bool, pairBtn, validateBtn) {
    pairBtn.style.display = bool == "false" ? "none" : "block";
    validateBtn.style.display = bool == "false" ? "none" : "block";
    validateInput.style.display = bool == "false" ? "none" : "block";
}

function googlePair(googleImg) {

    fetch(`http://localhost:3333/users/pair/`, {
        method: "POST",
        headers: {
            // "User-Agent": configTest.userAgent,
            "Content-Type": "application/json"
        },

    }).then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`)
        return response.text()
    }).then(text => {
        googleImg.style.display = "block";
        text = JSON.parse(text);
        text = text.split('<')[2].split("'")[1]
        console.log(text)
        googleImg.src = text
        console.log(googleImg.attributes);
        showValidateDivAfterPair(validateDiv)
    }).catch(err => {
        alert(`Error: ${err.message}`)
    })
}

function googleValidate(validateInput, userOutput) {
    const pin = {validatePin : validateInput.value}
    fetch("http://localhost:3333/users/validate/userPin/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify(pin)

    }).then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`)
        return response.text()
    }).then(text => {
        console.log(text)
        showUseroutput(userOutput)
    }).catch(err => {
        alert(err)
    })
}


function showUseroutput(userOutput) {
    userOutput.style.display = "block";
}