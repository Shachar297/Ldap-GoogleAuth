### MFA LDAP with Google Authenticator

- This repository will demonstrate how to set up LDAP with Google Authenticator as 2FA verification.

<!-- inPage TOC start -->

---
## Lab Highlights:
- [01. Pre Requirements](#01-Pre-Requirements)
- [02. Preparation](#02-Preparation)
  - [02.01. Prepare LDAP](#0201-Prepare-LDAP)
  - [02.02. Prepare LDAP Users](#0202-Prepare-LDAP-Users)
  - [02.03. Install LDAP Helm chart](#0203-Install-LDAP-Helm-chart)
  - [02.04. Verify that the Helm installed correctly](#0204-Verify-that-the-Helm-installed-correctly)
  - [02.05. Get LDAP credentials](#0205-Get-LDAP-credentials)
  - [02.06. Expose the LDAP service](#0206-Expose-the-LDAP-service)
- [03. Usage](#03-Usage)
  - [03.01. Start Ldap Server](#0301-Start-Ldap-Server)
  - [03.02. Start the demo server (NodeJs)](#0302-Start-the-demo-server-NodeJs)
  - [03.03. View the demo web page](#0303-View-the-demo-web-page)
  - [03.04. Fill in the credentials](#0304-Fill-in-the-credentials)
  - [03.04. Scan the QR code](#0304-Scan-the-QR-code)

---

<!-- inPage TOC end -->

## Usage:

[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://console.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/Shachar297/Ldap-GoogleAuth.git)

### **<kbd>CTRL</kbd> + click to open in new window**

---

### 01. Pre Requirements

- [NodeJs](https://nodejs.org/en/)
- [Helm3](https://helm.sh/docs/intro/install/)
- K8S cluster - In this tutorial we will be using [minikube](https://minikube.sigs.k8s.io/docs/start/)
- External LDAP server

### 02. Preparation

- For this demo we need a running K8S cluster with the ability to install Helm charts
- if you are using minikube

```sh
# Start minikube
minikube start
```

#### 02.01. Prepare LDAP

- For this demo we have prepared a custom Helm chart.
- The chart is located under the [LDAP](./server/LDAP) folder.
- Install Open Ldap with Helm chart with the pre defined users for testings.

#### 02.02. Prepare LDAP Users

- You can edit the desired users in this file: [Users.ldif](./server/LDAP/Users.ldif)

```sh
# This is a sample of the a user entry
# Feel free to edit and modify the given users list
objectClass:  top
objectClass:  person
objectClass:  organizationalPerson
objectClass:  inetOrgPerson
dn:           uid=shachar,ou=users,dc=demo,dc=com
cn:           shachar
sn:           Ovadida
uid:          shachar
givenName:    Shachar
userPassword: 1234
```

#### 02.03. Install LDAP Helm chart

- As mentioned above, the chart is located under the [LDAP](./server/LDAP) folder.
- For this helm we can pass the

```sh
# Install the custom Helm
# Pass it the desired values
# The path are under this repo (inside LDAP folder)
helm  upgrade \
      --install openldap \
      ./charts/openldap \
      --values ./values-openldap.yml \
      -n openldap
```

#### 02.04. Verify that the Helm installed correctly

- Verify that the Ldap is up and running.

```sh
# Once the helm installed you shell see the following message:
Release "openldap" does not exist. Installing it now.
NAME: openldap
LAST DEPLOYED: Sun Nov 14 18:20:02 2021
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:

OpenLDAP has been installed. You can access the server from within the k8s cluster using:
  openldap.default.svc.cluster.local:389

```

#### 02.05. Get LDAP credentials

- In order to be able to connect to the LDAP we need to expose its port.
- We will also need the DN of the given LDAP & the [admin credentials](./server/environment/admin.json).

```sh
# Get the admin credentials from the configuration file
cat ./server/environment/admin.json

###
### Or
###
### Extract the credentials from the cluster secrets

# Importantly, this will include the commands for retrieving the config and administration passwords

# Admin Password
kubectl get secret --namespace openldap openldap -o jsonpath="{.data.LDAP_ADMIN_PASSWORD}" | base64 --decode; echo

# Config password
kubectl get secret --namespace openldap openldap -o jsonpath="{.data.LDAP_CONFIG_PASSWORD}" | base64 --decode; echo
```

### 02.06. Expose the LDAP service

```sh
# Expose the LDAP service so we wil lbe able to connect ot it
# The default port is 3890
kubectl port-forward \
  $(kubectl get pods \
    -n openldap \
    --selector='release=openldap' \
    -o jsonpath='{.items[0].metadata.name}') \
    3890:389
```

--- 
### 03. Usage

#### 03.01. Start Ldap Server
- Start the external LDAP server
- Add the [Users.ldif](./LDAP/Users.ldif)  DB to LDAP
```sh
```sh
ldapadd   -x \
         -D "cn=admin,dc=demo,dc=com" \
         -H ldap://localhost:3890 \
         -w password \
         -f Users.ldif 

# The output should look like this:
adding new entry "ou=users,dc=demo,dc=com"
adding new entry "uid=gil,ou=users,dc=demo,dc=com"
adding new entry "uid=shachar,ou=users,dc=demo,dc=com"
adding new entry "uid=nir,ou=users,dc=demo,dc=com"
```


#### 03.02. Start the demo server (NodeJs)
> Note
>   The Nodejs Server try to communicate with the LDAP server so the server so the server must be running.
- Start NodeJs
```sh
# Install the required packages
npm i 

# Start the NodeJS server
 # Redirect to the server folder.
cd server/

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

#### 03.04. Scan the QR code