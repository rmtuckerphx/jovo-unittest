#!/bin/sh

printf "\n\n\n\n**** RUNNING build.sh ********************\n\n"

npm install || { echo "FATAL: Failed on 'npm install'"; exit 1; } 

cd app
npm install || { echo "FATAL: Failed on 'npm install'"; exit 1; } 

cd ../

printf "\n\n\n\n**** COMPLETED build.sh ********************\n\n"
