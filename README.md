# Aplicación de Recetas

## Índice

1. [Introducción](#introducción)
2. [Características](#características)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Configuración e Instalación](#configuración-e-instalación)
5. [Uso](#uso)
6. [Endpoints de la API](#endpoints-de-la-api)
7. [Contribuyendo](#contribuyendo)
8. [Licencia](#licencia)

## Introducción

Esta aplicación permite a los usuarios crear, borrar, actualizar(futura implementación) y visualizar recetas. Cuenta con una interfaz amigable construida con Vue.js, junto con un backend potenciado por Node.js y Express, usando una base de datos MySQL para almacenar los datos de las recetas.

## Características

- Crear nuevas recetas con ingredientes y pasos
- Borrar recetas existentes
- Actualizar recetas existentes (futura implementación)
- Ver una lista de todas las recetas
- Ver información detallada de una receta
- Subir y mostrar imágenes de las recetas

## Tecnologías Utilizadas

### Frontend
- Vue.js 3: Framework de JavaScript para construir interfaces de usuario
- Tailwind CSS: Framework de CSS para diseño basado en utilidades

### Backend
- Node.js: Entorno de ejecución de JavaScript para construir aplicaciones de red escalables
- Express: Framework para aplicaciones web en Node.js
- MySQL: Sistema de gestión de bases de datos relacional
- Multer: Middleware para manejar `multipart/form-data`, utilizado para subir imágenes

## Configuración e Instalación

### Prerrequisitos
- Node.js (v14 o posterior)
- MySQL

### Instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/Rotciv86/Recetas.git
    cd recipes-mysql-vue
    ```

2. Instalar dependencias para el backend y frontend:

    ```bash
    # Para el backend
    cd recipes-mysql-vue
    npm install

    # Para el frontend
    cd client
    cd recipes-fronend-vue
    npm install
    ```

3. Configurar la base de datos MySQL:

    - Crear una base de datos MySQL y actualizar el archivo `config/database.js` con las credenciales de tu base de datos.
    - Ejecutar los scripts SQL para crear las tablas necesarias. 

4. Ejecutar el servidor del backend:

    ```bash
    cd recipes-mysql-vue
    npm start
    ```

5. Ejecutar el servidor de desarrollo del frontend:

    ```bash
    cd client
    cd recipes-fronend-vue
    npm run dev
    ```

## Uso

### Crear una Receta
1. Abrir la aplicación en tu navegador (típicamente `http://localhost:5173`).
2. Hacer clic en el botón "Crear Receta".
3. Llenar el formulario con los detalles de la receta, ingredientes y pasos.
4. Subir una imagen para la receta.
5. Enviar el formulario para crear la receta.

### Actualizar una Receta
1. Ver los detalles de una receta.
2. Hacer clic en el botón "Editar" junto a cualquier campo que desees actualizar.
3. Modificar la información según sea necesario.
4. Guardar los cambios.

## Endpoints de la API

### Obtener Todas las Recetas

```http
GET /api/recipes-recipes
POST /api/recipes-recipes
GET /api/recipes-recipes/:id
DELETE /api/recipes-recipes/:id
PUT /api/recipes-recipes/:id

