FROM nginx
COPY dist /usr/share/nginx/html
COPY  nginx /etc
EXPOSE 80