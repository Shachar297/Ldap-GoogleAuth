# Instructions

### Ldap
* Install Helm and set chart values => 

```
helm upgrade --install openldap ./charts/openldap --values openldap/values-openldap.yml
```
* Make sure the above paths exist, and currect.

* To Ensure process is going to complete succesfully, Make sure that ldap is up and running.
* also, make sure that you hold the port, and the DN for the ldap database.
* For this example you can use [admin.json](/../enviorenment)
* Or if you just cloned this repository, have ldap running, execute the following command to simply get the needed credentials.
```
kubectl get secret --namespace identity openldap -o jsonpath="{.data.LDAP_ADMIN_PASSWORD}" | base64 --decode; echo
kubectl get secret --namespace identity openldap -o jsonpath="{.data.LDAP_CONFIG_PASSWORD}" | base64 --decode; echo
```
* one last step, expose LDAP port to outcoming http requests
```
kubectl port-forward \$(kubectl get pods -n default --selector='release=openldap' -o jsonpath='{.items[0].metadata.name}') \3890:389
```

# NodeJs

* When NodeJs starts, automaticly, will try to commit a login to ldap server and database.
* make sure the ldap instructions are complete and ldap is up and running.

* There are several dependecies here, run [dependencies.sh](./dependencies.sh) to install and store them.



## Flow

* Start Ldap Server
* Start NodeJs

* This example goes automaticly when server starts, details are hard-coded within the [ldap-logic](../logic/ldap-logic.js).
* If you want to chane this, pass in to the argument to the [ldap-controller](../controllers/ldap-contoller.js) and change the and pass it on to the next module.

* Next, for test you will be printed the google QR-code, then you will need to scan it, if logged in successfuly.

