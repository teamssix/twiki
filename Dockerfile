FROM node:12.22.1
LABEL maintainer="teamssix <https://wiki.teamssix.com>"
COPY . /TWiki
WORKDIR /TWiki
RUN yarn install && yarn docs:build
FROM nginx:alpine
COPY --from=0 /TWiki/docs/.vuepress/dist/ /usr/share/nginx/html/
