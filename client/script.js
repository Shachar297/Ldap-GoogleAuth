const btn = document.getElementById("googleGo");
const userInput = document.getElementById("userInput");
const pairBtn = document.getElementById("pairBtn");
pairBtn.style.display = "none";
let isLoggedIn = false;

btn.addEventListener("click", () => {
    onGoogleAuth(userInput, userInput)
});

pairBtn.addEventListener("click", () => {
    googlePair()
});

function onGoogleAuth(userInput, userInput) {
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
        displayOrHidBeutton(text, pairBtn)

    }).catch(err => {
        console.log(err);
    })
}

function displayOrHidBeutton(bool, pairBtn) {
    pairBtn.style.display = bool == "false" ? "none" : "block";
}

function googlePair() {
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
        console.log(text)

    }).catch(err => {
        console.log(err);
    })
}