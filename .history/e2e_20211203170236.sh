

set -x

minikube_status=$(minikube status)

echo $minikube_status

if [[$minikube_status.apiserver == "Stopped"]];
then
minikube start
fi