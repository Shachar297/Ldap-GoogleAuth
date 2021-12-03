

set -x

minikube_status=$(minikube status)

echo $minikube_status.apiserver "sss"

if [[$minikube_status.apiserver == "Stopped"]];
then
minikube start
fi