

set -x

minikube_status=$(minikube status)

echo $minikube_status

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

osascript -e 'tell application "Terminal" to activate' \
-e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' \
-e 'tell application "terminal" to do do script "echo hello" in selected tab of the front window'


#chmod +x portforward.sh

#./portforward.sh

kubectl get pods -n openldap

echo "--------"