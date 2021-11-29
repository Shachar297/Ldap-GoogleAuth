# LDAP MFA Via FreeRadius & KeyCloak.

-----


# Stages =>

* Make sure minikune is installed

```
brew install minikube
```

* If so,  start minikube.

```sh
minikube start
```

```sh
# Locate Yourself inside the LDAP directory.
cd LDAP
```

* LDAP Pre defined configuration will found in [users.ldif]() & [ldap-values.yaml](), Feel free to customize it.

* Next step we want to install openldap, with the pre-definded configuration files.

```sh
helm  upgrade \
      --install openldap \
      ./charts/openldap \
      --values ./values-openldap.yml
```
* you shoud see something like this output :

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

* In a new terminal - in the same folder, execute -

```sh
# Feel free to change the outcoming port
kubectl port-forward $(kubectl get pods -n openldap) -n openldap 3899:389
```

* Next step is to apply ldap users from the [users.ldif]() into the ldap DB

```sh
ldapadd   -x \
         -D "cn=admin,dc=demo,dc=com" \
         -H ldap://localhost:3899 \
         -w password \
         -f Users.ldif 

# The output should look like this:
adding new entry "ou=users,dc=demo,dc=com"
adding new entry "uid=gil,ou=users,dc=demo,dc=com"
adding new entry "uid=shachar,ou=users,dc=demo,dc=com"
adding new entry "uid=nir,ou=users,dc=demo,dc=com"
```
-----
## Keycloak

-----

* Add Bitnami repo and install Keycloak from Bitnami.

```sh
# Add Bitnami repo
helm repo add bitnami https://charts.bitnami.com/bitnami
# Install Keycloak
# Feel free to change my-release to whatever you'd like.
helm install my-release bitnami/keycloak
```

* Keycloak is a Load Balancer, Apply a tunnel to serve its networks.

```sh
# This command will lock your terminal and requests sudoer permissions.

minikube tunnel
```

* Get Your Credentials.

```sh
    # Username
    user (Defaultly assinged)
    # Password
    kubectl get secret -n default my-release-keycloak -o jsonpath="{.data.management-password}"; echo
```

* After a minute ot two, enter your browser at port 80,
###### login with the Credentials Above.

* After Logged in you see in the side-bar a user-Federation Option.

<img src="sidebar.png" alt="side-bar" width="125" height=250>

---------
* Customize your ldap db by following this picture. if you configured you ldap by this guide, you will only have to change the ldapURL to yours.

##### Your LDAP Url can be displayed by executing 
```sh
kubectl get endpoints -n openldap
# You should see two results, 389 is the TCP (which you will use in this case), the other one is the ssl.
```


<img src="ldapconf.png" alt="LDAP-Configuration" width="650">

-------

# FreeRadius

To be Continued.