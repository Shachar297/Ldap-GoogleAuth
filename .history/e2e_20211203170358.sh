

set -x

minikube_status=$(minikube status)

echo $minikube_status "sss"

if [[$minikube_status == "Stopped"]];
then
minikube start
fi