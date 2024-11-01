#!/usr/bin/bash
set +x

source .bashrc
git clone --single-branch --branch developing https://github.com/$GITHUB_OWNER/$GITHUB_REPO $WORKSPACE 
cd $WORKSPACE
docker compose up