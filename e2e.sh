

set -x

minikube_status=$(minikube status)
PF=kubectl port-forward openldap-6f478b4558-wsvg7 -n openldap 3899:389;
my_release=keycloak
# Checking if minikue has started or stopped
if [[ $minikube_status == *"Stopped" ]];
then
minikube start
fi

#git clone git@github.com:Shachar297/Ldap-GoogleAuth.git
#git checkout ldap-end-to-end
cd LDAP


helm  upgrade \
      --install openldap \
      ./charts/openldap \
      --values ./values-openldap.yml

# MacOs Users Only can execute this command

#osascript -e 'tell application "Terminal" to activate' \
#-e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' \
#-e 'tell application "terminal" to do do script /"${PF}"/ in different tab of the front window'

if [[ -f portforward.sh ]];
 then
rm portforward.sh
fi

echo "kubectl port-forward $(kubectl get pods -n openldap) -n openldap 3899:389 &" >> portforward.sh
chmod +x portforward.sh

./portforward.sh

kubectl get pods -n openldap

ldapadd   -x \
         -D "cn=admin,dc=demo,dc=com" \
         -H ldap://localhost:3899 \
         -w password \
         -f Users.ldif 

echo "-------- LDAP Section Done -------"

cd ..
mkdir keycloak
cd keycloak

# Add the official repo of bitnami of keycloak na install it with those two commands

helm repo add bitnami https://charts.bitnami.com/bitnami
helm install $my_release bitnami/keycloak


# Username defaultly is 'user'

# Get the Management password for logging in to keycloak GUI
kubectl get secret -n default $my_release-keycloak -o jsonpath="{.data.management-password}"; echo

# keycloak is a load balancer.
minikube tunnel


open -a "Google Chrome" localhost:80

# Customize your keycloak to LDAP DB
# Take a look at README.md

