const btn = document.getElementById("googleGo");
const userInput = document.getElementById("userInput");
const pairBtn = document.getElementById("pairBtn");
const validateBtn = document.getElementById("validateBtn");
const googleImg = document.getElementById("googleImg");
const googleLinkA = document.getElementById("googleLinkA");
const validateInput = document.getElementById("validateInput");

googleImg.style.display = "none";
pairBtn.style.display = "none";
validateBtn.style.display = "none";
validateInput.style.display = "none";
let isLoggedIn = false;

btn.addEventListener("click", () => {
    onGoogleAuth(userInput, pairBtn, validateBtn, validateInput);
});

pairBtn.addEventListener("click", () => {
    googlePair(googleImg)
});

validateBtn.addEventListener("click", () => {
    googleValidate(validateInput);
})

function onGoogleAuth(userInput, pairBtn, validateBtn, validateInput) {
    console.log(userInput.value);
    const user = { username: userInput.value }
    fetch(`http://localhost:3333/users/`, {
        method: "POST",
        headers: {
            // "User-Agent": configTest.userAgent,
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)
    }).then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`)
        return response.text()
    }).then(text => {
        console.log(text)
        isLoggedIn = text
        displayOrHidBeutton(text, pairBtn, validateBtn, validateInput)

    }).catch(err => {
        console.log(err);
    })
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
        console.log(googleImg.attributes)
    }).catch(err => {
        console.log(err);
    })
}

function googleValidate(validateInput) {
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
    }).catch(err => {
        console.log(err);
    })
}
