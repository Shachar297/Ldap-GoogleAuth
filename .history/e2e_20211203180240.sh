

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

PF=kubectl port-forward openldap-6f478b4558-wsvg7 -n openldap 3899:389;

helm  upgrade \
      --install openldap \
      ./charts/openldap \
      --values ./values-openldap.yml

#osascript -e 'tell application "Terminal" to activate' \
#-e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' \
#-e 'tell application "terminal" to do do script /"${PF}"/ in different tab of the front window'

echo "kubectl port-forward openldap-6f478b4558-wsvg7 -n openldap 3899:389 &" >> portforward.sh
chmod +x portforward.sh

./portforward.sh

kubectl get pods -n openldap



echo "--------"

