FROM node:lts-alpine

ARG PROJECT_NAME=app
WORKDIR /usr/src

# Vite のスキャフォールドを非対話で生成
RUN npm create vite@latest $PROJECT_NAME -- --template react \
 && cd $PROJECT_NAME && npm install

WORKDIR /usr/src/$PROJECT_NAME

EXPOSE 5173
CMD ["npm","run","dev","--","--host","0.0.0.0"]