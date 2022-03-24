# Arrenda

Examen de ingreso en arrenda

## Definicion Del proyecto

### Stack tecnologico

- node js (Nestjs como framework)
- typescript
- postgres
- Docker

### Seguridad

- Decidi usar un sistema de refresh y access tokens para que toda operacion importante fuera realizada con un token de corta duracion (5m)
- El algoritmo de generacion de tokens es RSA, de esta forma si se escalara a ms se podria compartir la llave publica y tener una mejor auth (ademas es mas seguro en general)
- Seguridad de Cors filtrando solo la witelist en envs
- Validaciones de DTO
- Sistema de roles basico contando con 3 roles {basic|admin|sysAdmin}

  - basic {GET}
  - admin {GET|POST}
  - sysAdmin {GET|POST|PATCH|DELETE}

- Flujo de auth
  - Usuario se registra obtiene {access|refresh} token
  - Usuario hace obtiene {access|refresh} token
  - El access Token cacudo -> {GET}/current-session para obtener un nuevo {access} token
  - Se quiere hacer un log-out -> {GET}/close-session

### Recursos

- DER https://drive.google.com/file/d/1lcgB39e1gHBTT9gcqtC26SCo6JVeQE8I/view
- DOCS con swagger {host}/api-docs

### Adicionales

- Husky hooks para commits
  - Busqueda autimatica de errores definidos en eslintrc {en caso de fallo no se ejecuta el commit}
  - Estilos en el proyecto definidos en .prettierrc
- Validacion de variables de entorno con Joi previo a iniciar el proyecto
- Coleccion de Postman en /postman

## Pre-requisitos para iniciar el proyecto

Es necesario contar con las siguientes herramientas instaladas en tu equipo, antes de intentar correr el proyecto.

- NodeJS >= 12
- Docker
- Docker Compose

### Variables de Ambiente

En la raíz directorio del proyecto, crea un archivo con nombre `.env` y asignar variables de entorno como se muestra en `.env.sample`

### Inital Setup

En la raíz directorio del proyecto, ejecuta en tu línea de comandos:

- `npm i`
- `npm run certs`
- `docker-compose build`
- `docker-compose up -d`
