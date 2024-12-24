# PowerFuel

PowerFuel es una plataforma de comercio electrónico para la venta de suplementos alimenticios. Este proyecto está dividido en dos partes principales: el cliente y el servidor.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Características](#características)

## Instalación

### Requisitos Previos

- Node.js
- npm o yarn
- MySQL

### Configuración del Cliente

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/PowerFuel.git
    cd PowerFuel/client
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Configura las variables de entorno en el archivo `.env`.

4. Inicia la aplicación:
    ```sh
    npm run dev
    ```

### Configuración del Servidor

1. Ve al directorio del servidor:
    ```sh
    cd ../server
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Configura las variables de entorno en el archivo `.env`.

4. Inicia el servidor:
    ```sh
    npm run dev
    ```

## Uso

### Cliente

El cliente está construido con Next.js y NextUI. Puedes acceder a la aplicación en `http://localhost:3000`.

### Servidor

El servidor está construido con Node.js y Express. Puedes acceder a la API en `http://localhost:4001`.

## Estructura del Proyecto

PowerFuel/  
├── client/   
│   ├── components/  
│   │   ├── address/  
│   │   ├── auth/  
│   │   ├── cart/  
│   │   ├── category/  
│   │   ├── footer/  
│   │   ├── navigation/  
│   │   ├── notification/  
│   │   ├── orders/  
│   │   ├── payments/  
│   │   ├── product/  
│   │   └── icons.tsx  
│   ├── config/  
│   ├── context/  
│   ├── hoc/  
│   ├── hooks/  
│   ├── layouts/  
│   ├── pages/  
│   ├── services/  
│   ├── styles/  
│   ├── types/  
│   ├── .vscode/  
│   │   └── settings.json  
│   ├── .env  
│   ├── .eslintrc.json  
│   ├── .gitignore  
│   ├── LICENSE  
│   ├── next.config.js  
│   ├── package.json  
│   ├── postcss.config.js  
│   ├── README.md  
│   ├── tailwind.config.js  
│   └── tsconfig.json  
├── server/  
│   ├── database/  
│   ├── src/  
│   │   ├── api/  
│   │   ├── middlewares/  
│   │   ├── model/  
│   │   ├── routes/  
│   │   └── utils/  
│   ├── .env  
│   ├── .gitignore  
│   ├── package.json  
│   └── public/  
└── SECURITY.md  
  
## Tecnologías Utilizadas

- **Cliente:**
  - Next.js
  - NextUI
  - Tailwind CSS
  - TypeScript
  - Framer Motion
  - next-themes

- **Servidor:**
  - Node.js
  - Express
  - Sequelize
  - MySQL
  - bcrypt
  - nodemailer
  - dotenv

## Características

- **Autenticación y Autorización:**
  - Registro y login de usuarios
  - Roles y permisos

- **Gestión de Productos:**
  - CRUD de productos
  - Categorías y marcas

- **Carrito de Compras:**
  - Añadir y eliminar productos del carrito
  - Proceso de checkout

- **Notificaciones:**
  - Notificaciones de pedidos y promociones

- **Panel de Administración:**
  - Gestión de usuarios, productos, categorías y pedidos

Las contribuciones son bienvenidas.
