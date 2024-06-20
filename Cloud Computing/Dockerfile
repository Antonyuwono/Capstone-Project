FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .



ENV MODEL_URL=https://storage.googleapis.com/deteksi-tempat-bersejarah/tfjs_model%20revised/model.json

CMD ["npm", "start"]