# SistemaHoraReuniones
Ejemplo de sistema de reserva para sala de reuniones utilizando una API creada en NodeJS y Angular

## Pre-requisitos 📋
Para instalar este proyecto necesitas instalar previamente.
```
- nodejs
- postgres
- pgadmin
- angular
```

Una vez instalado `postgres` y `postgres` deberás crear la base de datos. Para ello utiliza las consultas sql que se encuentran en `API/sql/db.sql`.

## Configuraciones 🚀
Asegurate de que la `API` esté accediendo a la base de datos correcta. Para eso deberás corroborar la configuración que se encuentra en el archivo `API/src/database/database.js`. Los argumentos de entrada de la varibale `sequelize` son (`nombre_base_de_datos`,`nombre_usuario`,`password`,`opciones`). Dentro del argumento opciones asegurate de que el `host` y `port` sean los correctos para garantizar una correcta conexión con la base de datos.

## Instalación y ejecución 🔧
### API
1. accede a la ubicacion `/API`. Para instalar los paquetes necesarios ejecuta el comando:
```
npm install
```
2. Para ejecutar la API dentro de un entorno de desarrollo ejecuta el comando:
```
npm run dev
```
3. La api estará corriendo en la dirección `http://localhost:4000`
### Front
1. accede a la ubicacion `/Front`. Para instalar los paquetes necesarios ejecuta el comando:
```
npm install
```
2. Para ejecutar el front de la aplicación dentro de un entorno de desarrollo ejecuta el comando:
```
npm start
```
3. La aplicación estará corriendo en la dirección `http://localhost:4200`

## Posible errores 🔩
1. Si tienes problema al instalar las dependencias de angular con el módulo node-sass ejecuta el siguiente comando:
```
sudo npm install --save-dev  --unsafe-perm node-sass
```
