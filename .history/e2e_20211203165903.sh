

set -x

minikube_status=minikube_status

echo ${minikube_status}

if [[${minikube_status} == "Stopped"]];
then
minikube start
fi