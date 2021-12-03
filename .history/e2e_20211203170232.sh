

set -x

minikube_status=$(minikube status)

echo $minikube_status

if [[$minikube_status.ap == "Stopped"]];
then
minikube start
fi