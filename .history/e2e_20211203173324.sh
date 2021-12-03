

set -x

minikube_status=$(minikube status)

echo $minikube_status

if [[ $minikube_status == *"Stopped" ]];
then
minikube start
fi

git clone git@github.com:Shachar297/Ldap-GoogleAuth.git
git checkout ldap-end-to-end
cd LDAP

helm  upgrade \
      --install openldap \
      ./charts/openldap \
      --values ./values-openldap.yml

