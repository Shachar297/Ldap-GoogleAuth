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
      
