### MFA - [01-Ldap](Labs/01-Ldap)
---

## Lab Highlights:

- [01. Pre Requirements](#01-Pre-Requirements)
- [02. Preparation](#02-Preparation)
  - [02.01. Prepare LDAP](#0201-Prepare-LDAP)
    - [02.01.01. Prepare LDAP Users](#020101-Prepare-LDAP-Users)
    - [02.01.02. Install LDAP Helm chart](#020102-Install-LDAP-Helm-chart)
    - [02.01.02. Verify that the Helm installed correctly](#020102-Verify-that-the-Helm-installed-correctly)

---

<!-- inPage TOC end -->

## Usage:

[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://console.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/Shachar297/Ldap-GoogleAuth.git)

### **<kbd>CTRL</kbd> + click to open in new window**

---

### 01. Pre Requirements

- [NodeJs](https://nodejs.org/en/)
- External LDAP server

#### 03.02. Start the demo server (NodeJs)

- Start NodeJs
```sh
# Install the required packages
npm i 

# start nodejs server
npm start
```

#### 03.03. View the demo web page
- This demo is based upon HTML page for entering username password.
- Open the browser in the following page:
[http://127.0.0.1:5500/client/index.html](http://127.0.0.1:5500/client/index.html)
#### 03.04. Fill in the credentials
- Fill in the credentials in the HTML page.
- Click on `Login`

- Click on `Pair` to start Authentication infront of google.

- Scan the QR Code in the Google Authenticator APP.

- Fill in the 6 digit password google sends you.
