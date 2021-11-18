### MFA LDAP with Google Authenticator

- This repository will demonstrate how to set up LDAP with Google Authenticator as 2FA verification.

<!-- inPage TOC start -->

---
## Lab Highlights:
- [01. Pre Requirements](#01-Pre-Requirements)
  - [02.05. Get LDAP credentials](#0205-Get-LDAP-credentials)
- [03. Usage](#03-Usage)
  - [03.01. Start the demo server (NodeJs)](#0301-Start-the-demo-server-NodeJs)
  - [03.03. View the demo web page](#0303-View-the-demo-web-page)
  - [03.04. Fill in the credentials](#0304-Fill-in-the-credentials)
  - [03.04. Scan the QR code](#0304-Scan-the-QR-code)

---

<!-- inPage TOC end -->
### 01. Pre Requirements

- [NodeJs](https://nodejs.org/en/)

#### 02.05. Get LDAP credentials
- For this demo we will be using a free online LDAP server as our LDAP server - [https://www.forumsys.com/](https://www.forumsys.com/tutorials/integration-how-to/ldap/online-ldap-test-server/) 

- The server details are the following:
  #### LDAP Server Information (read-only access):

  Description   | Value  
  --------------|-------------
  Server        | ldap.forumsys.com  
  Port          | 389
  Bind DN       | cn=read-only-admin,dc=example,dc=com
  Bind Password | password

  - **All user passwords are password.**

  #### Ldap users list
  - You may also bind to individual Users (uid) or the two Groups (ou) that include:
  ```sh
  # List of users in the LDAP group [mathematicians]
  ou=mathematicians,dc=example,dc=com

  riemann
  gauss
  euler
  euclid

  # List of users in the LDAP group [scientists]
  ou=scientists,dc=example,dc=com
  einstein
  newton
  galieleo
  tesla
  ```
--- 
### 03. Usage

#### 03.01. Start the demo server (NodeJs)
```sh
# Install the required packages
npm i 

# Start the NodeJS server
npm start
```

#### 03.03. View the demo web page
- This demo is based upon HTML page for entering username password.
- Open the browser in the following page:
[http://127.0.0.1:5500/client/index.html](http://127.0.0.1:5500/client/index.html)
#### 03.04. Fill in the credentials
- Fill in the credentials in the HTML page.
- Click on `Login`

#### 03.04. Scan the QR code