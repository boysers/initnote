# InitNote


Application web de prise de note avec Angular, ExpressJS (en typescript), MongoDB, Nginx, Docker

--- 

**Develeppoment :**
---------------

```
make up dev
```

front: http://localhost:4200

back: http://localhost:3000

db: mongodb://localhost:27017

--- 

**Production :**
---------------

```
make up prod
```

front: http://localhost:8080
back:  http://localhost:8080/api

--- 

**Variable d'environnement :**
---------------

```
CLIENT_PORT=4200
CLIENT_HOSTNAME=angular-frontend

API_PORT=3000
API_HOSTNAME=api-express
TOKEN_SECRET=development_token

MONGO_PORT=27017
MONGO_HOSTNAME=mongodb
MONGO_DB=initnote
MONGO_USERNAME=boysers
MONGO_PASSWORD=pass
```
