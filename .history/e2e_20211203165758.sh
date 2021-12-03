

set -x

export minikube_status=$(minikube_status)

echo
if [[${minikube_status} == "Stopped"]];
then
minikube start
fi