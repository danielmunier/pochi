FROM node:latest 

WORKDIR /
CMD ls
CMD node prod/index.js

