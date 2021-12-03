

set -x

export minikube_status=$(minikube_status)


if [[${minikube_status} == "Stopped"]];
then
minikube start
