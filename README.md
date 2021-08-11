# Untitled

# Backend Coding Challenge

Recuerden que deben de ejecutar `npm install` para reconstruir los módulos de Node.

## Configuraciones iniciales

configurar el archivo `env/.develop.env` y `env/.test.env`  para las variables de entorno, sugiero estos valores para su funcionamiento de manera local

**.develop.env**

```bash
PORT=8080
MONGODB_CNN=mongodb+srv://admin:admin123@cluster0.aql5h.mongodb.net/bcc?retryWrites=true&w=majority
SECRETORPRIVATEKEY=J8PCyfC3hsRaFhbyrFY5kurYD30FWfmpHzke3aFM9hmaRKI6yfSzED+Z+8U+ols3LS2HwLPsSlnJw+j5LyX20r7ZR9N16XUkZbdfmTdfHb3STSADTeiuLxgq0AXkAfVTKgdG3PLf5JZuxqJMxYWKNdOFxXQeeBF71zeeIv5GTOo=

```

.develop.env

**.test.env**

```bash
PORT=8080
MONGODB_CNN=mongodb+srv://admin:admin123@cluster0.aql5h.mongodb.net/jestTest?retryWrites=true&w=majority
SECRETORPRIVATEKEY=J8PCyfC3hsRaFhbyrFY5kurYD30FWfmpHzke3aFM9hmaRKI6yfSzED+Z+8U+ols3LS2HwLPsSlnJw+j5LyX20r7ZR9N16XUkZbdfmTdfHb3STSADTeiuLxgq0AXkAfVTKgdG3PLf5JZuxqJMxYWKNdOFxXQeeBF71zeeIv5GTOo=

```

## Ejecutar aplicación local

Una vez configurado las variables de entorno, ejecutar `npm run start` y se ejecutara la versión de desarrollo con el siguiente endpoint `[http://localhost:8080](http://localhost:8080)`  

## Ejecutar test

Una vez configurado las variables de entorno, ejecutar `npm run test` y se ejecutaran las pruebas unitarias

## Docker Swarm

para la ejecución de docker se requiere realizar

moverse a la carpeta de `nginx-docker`, estando en la carpeta ejecutar el siguiente comando:

```docker
docker image build -t gerardomc/nginx_balancenode .
```

retornar a la carpeta raíz del proyecto y posteriormente ejecutar el siguiente comando:

```docker
docker image push gerardomc/balancenode
```

una vez ejecutados los comandos procederemos a ejecutar el comando:

```docker
docker-compose up
```

te generara un contenedor docker con la aplicación desplegada

### URL validas

se adjunta archivo postman

```bash
POST http://localhost/api/auth/login
POST http://localhost/api/orders
POST http://localhost/api/users
GET  http://localhost/api/reports
GET  http://localhost/api/info

```

[backend.postman_collection.json](https://drive.google.com/file/d/1DkJ8tsiAGYppWXF0dtVeRbqcHWT0StQJ/view?usp=sharing)