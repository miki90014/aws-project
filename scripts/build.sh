#!/usr/bin/bash
set +x

source .bashrc
git clone --single-branch --branch developing https://github.com/$GITHUB_OWNER/$GITHUB_REPO $WORKSPACE
sed -i "s/ENV AWS_REGION=.*/ENV AWS_REGION=$AWS_REGION/" $WORKSPACE/backend/Dockerfile
sed -i "s/ENV COGNITO_POOL_ID=.*/ENV COGNITO_POOL_ID=$COGNITO_POOL_ID/" $WORKSPACE/backend/Dockerfile
sed -i "s/ENV COGNITO_CLIENT_ID=.*/ENV COGNITO_CLIENT_ID=$COGNITO_CLIENT_ID/" $WORKSPACE/backend/Dockerfile
cd $WORKSPACE
cp /home/ubuntu/.aws/credentials $WORKSPACE/backend
sudo docker compose up