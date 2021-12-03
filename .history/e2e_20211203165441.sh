#!bin/bash

set -x

export minikube_status=$(minikube_status)


export pattern="Stopped|not found"

if [[ ! -f ]]