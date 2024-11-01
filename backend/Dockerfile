FROM python:3.11-slim
ARG BACKEND_PORT
ENV AWS_REGION=${AWS_REGION}
ENV COGNITO_POOL_ID=${COGNITO_POOL_ID}
ENV COGNITO_CLIENT_ID=${COGNITO_CLIENT_ID}
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY app.py ./
EXPOSE ${BACKEND_PORT}
CMD ["python", "app.py"]