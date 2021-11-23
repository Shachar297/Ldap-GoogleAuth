// Register listeners
function init() {

    // Login handler
    $('#loginBtn').on('click', login);

    // Validation input
    $('#validateBtn').on('click', MFAValidate);
};

/**
 * Login user 
 * user will pass the credentials and this method will verify the user
 */
function login() {

    console.log('Login...')
    $.ajax(`/ldap/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            username: $('#userInput').val()[0],
            password: $('#userPassword').val()
        })
    }).done(response => {
        console.log(`User found. Proceed to next step`);
        // get the MFA QRcode
        getMFA();
    }).fail(err => {
        console.log(err);
        alert(`Error: ${err}`)
    })
}

/**
 * Generate the MFA authentication method
 * In our demo this will be Google Authenticator (QR code)
 */
function getMFA() {

    // Send the authentication request
    $.ajax(`/auth/pair`, {
        method: "POST",
    }).done(response => {
        let qrCode = $(response).find('img').attr('src');
        $('#userFeedback').hide().text(`Got QRCode Response`).fadeIn(1500);

        console.log(`Got qrCode Response: ${qrCode}`);

        // Parse the response and extract the QR image 
        $('#qrCode').attr('src', $(response).find('img').attr('src'));

        // Enable the validation inputs
        $('[data-validation]').removeAttr('disabled');

        // Show the validate section in the html page
        $('#validate-section').hide().fadeIn(1500);
    }).fail(err => {
        alert(`Error --------: ${err.message}`)
    })
}

/**
 * Validate the pin code (6 digits in this demo)
 */
function MFAValidate() {
    console.log('MFAValidate');

    $.ajax("/auth/validateMFA/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            validatePin: $('#validateInput').val()
        })
    }).done(response => {
        // Add some GUI effects :-)
        response.toLowerCase() == 'true' ?
            $('#userFeedback')
                .removeClass('alert-danger')
                .addClass('alert-success fw-bold')
                .html('<i class="fas fa-thumbs-up fa-2x"></i>&emsp;User Authenticated !!!!') :
            $('#userFeedback')
                .removeClass('alert-success')
                .addClass('alert-danger fw-bold')
                .html('<i class="fas fa-thumbs-down fa-2x"></i>&emsp;Authentication failed. Please try again')
                .fadeOut(1000)
                .fadeIn(1000)
                .fadeOut(1000)
                .fadeIn(1000);
    }).fail(err => {
        $('#userFeedback')
            .removeClass('alert-success')
            .addClass('alert-danger fw-bold')
            .html(`Authentication Error, ${err}`);
    })
}

// Register listeners
init();
