#!/bin/sh
echo "Enter project to start (Basic_Auth, Mutual_Auth, XPayToken):"
read PROJECT

PROJ_DIR=`pwd`

SERVER=$PROJ_DIR"/"$PROJECT"/server"
CLIENT=$PROJ_DIR"/"$PROJECT"/client"

osascript -e 'tell application "Terminal" to do script "cd '$SERVER'; node app.js"'
sleep 1
osascript -e 'tell application "Terminal" to do script "cd '$CLIENT'; node app.js"'
