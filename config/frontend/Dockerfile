# Use an official node runtime as a parent image
FROM node:13

# Instalamos curl, node y yarn
RUN apt-get -y install curl \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash \
  && apt-get install nodejs \
  && curl -o- -L https://yarnpkg.com/install.sh | bash

# Copiamos el entrypoint
COPY ./config/frontend/entrypoint.sh .
COPY ./frontend /app
WORKDIR /app/