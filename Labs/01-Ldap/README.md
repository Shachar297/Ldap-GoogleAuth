### MFA LDAP with Google Authenticator

- This repository will demonstrate how to set up LDAP with Google Authenticator as 2FA verification.

<!-- inPage TOC start -->

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
- [Helm3](https://helm.sh/docs/intro/install/)
- K8S cluster - In this tutorial we will be using [minikube](https://minikube.sigs.k8s.io/docs/start/)


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
      --values ./values-openldap.yml
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
- We will also need the DN of the given LDAP & the [admin credentials](./server/environment/ldap-admin.json).
```sh
# Get the admin credentials from the configuration file
cat ./server/environment/ldap-admin.json

### 
### Or
###
### Extract the credentials from the cluster secrets

# get the Admin password - LDAP 
LDAP_ADMIN_PASSWORD=$(kubectl get secret --namespace openldap openldap -o jsonpath="{.data.LDAP_ADMIN_PASSWORD}" | base64 --decode)

# get the Config password
LDAP_CONFIG_PASSWORD=$(kubectl get secret --namespace openldap openldap -o jsonpath="{.data.LDAP_CONFIG_PASSWORD}" | base64 --decode)
```

### # 02.06. Expose the LDAP service
```sh
# Expose the LDAP service so we wil lbe able to connect ot it
kubectl port-forward \
  $(kubectl get pods \
    -n openldap \
    --selector='release=openldap' \
    -o jsonpath='{.items[0].metadata.name}') \
    3890:389
```

# NodeJs

* When NodeJs starts, automatically, will try to commit a login to ldap server and database.
* make sure the ldap instructions are complete and ldap is up and running.

* There are several dependencies here, run [dependencies.sh](https://github.com/Shachar297/Ldap-GoogleAuth/blob/master/server/requirements/dependecies.sh) to install and store them.



## Flow

* Start Ldap Server
* Start NodeJs

* This example goes automatically when server starts, details are hard-coded within the [ldap-logic](../logic/ldap-logic.js).
* If you want to change this, pass in to the argument to the [ldap-controller](../controllers/ldap-contoller.js) and change the and pass it on to the next module.

* Next, for test you will be printed the google QR-code, then you will need to scan it, if logged in successfully.

* If you execute the addUser function under ldap-controller, you will be needed to pair a key which sent from google.