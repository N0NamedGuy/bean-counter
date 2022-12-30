FROM node:19.3.0 as build

WORKDIR /app

ENV PATH /app/node_module/.bin:$PATH

COPY ./packages/client/package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn/ ./.yarn
COPY ./packages/client/public/ ./public
COPY ./packages/client/src/ ./src
RUN yarn install --immutable
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html/beans
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
