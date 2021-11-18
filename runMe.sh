#!/bin/bash

set -x

# Start minikube
minikube start

# Switch to the desired folder
cd server/LDAP/

# install the custom Helm chart
helm  upgrade \
      --install openldap ./charts/openldap \
      --values ./values-openldap.yml \
      -n openldap
      

# Incule Administration & Config password

kubectl get secret --namespace openldap openldap -o jsonpath="{.data.LDAP_ADMIN_PASSWORD}" | base64 --decode; echo
kubectl get secret --namespace openldap openldap -o jsonpath="{.data.LDAP_CONFIG_PASSWORD}" | base64 --decode; echo

# Using kubectl proxu to expose our LDAP server locally
# This will actualy start up our LDAP server to communicate with the outside world.

kubectl port-forward --namespace openldap \
      $(kubectl get pods -n openldap --selector='release=openldap' -o jsonpath='{.items[0].metadata.name}') \
      3890:389


