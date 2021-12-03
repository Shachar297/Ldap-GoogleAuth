

set -x

minikube_status=$(minikube status)

echo $minikube_status

if [[ $minikube_status == *"Stopped" ]];
then
minikube start
fi

git clone git@github.com:Shachar297/Ldap-GoogleAuth.git