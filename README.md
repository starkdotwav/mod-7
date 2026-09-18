# Módulo 7 - Node.js + Express + Sequelize

Backend para la gestión de usuarios y órdenes con PostgreSQL y Sequelize.

## Requisitos

- Node.js 18 o superior
- PostgreSQL instalado y en ejecución

## Instalación

```bash
git clone https://github.com/starkdotwav/mod-7.git
cd mod-7
npm install
```

## Configuración

Crea el archivo `.env` desde la plantilla y agrega tus credenciales locales:

```bash
cp .env.example .env
```

Crea la base de datos:

```sql
CREATE DATABASE modulo7_db;
```

## Datos de prueba

El siguiente comando elimina y vuelve a crear las tablas, luego inserta tres usuarios y cuatro órdenes de ejemplo:

```bash
npm run seed
```

## Ejecución

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/usuarios` | Lista usuarios sin contraseñas |
| GET | `/api/usuarios?nombre=Juan` | Busca usuarios por nombre |
| GET | `/api/usuarios/:id` | Obtiene un usuario |
| POST | `/api/usuarios` | Crea un usuario |
| PUT | `/api/usuarios/:id` | Actualiza nombre o email |
| DELETE | `/api/usuarios/:id` | Elimina un usuario |
| GET | `/api/usuarios/:id/pedidos` | Obtiene usuario y sus órdenes |
| POST | `/api/usuarios-con-orden` | Crea usuario y orden mediante transacción |

## Ejemplo: crear usuario

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

Envía ese contenido a `POST /api/usuarios` con `Content-Type: application/json`.

## Ejemplo: transacción

```json
{
  "userData": {
    "nombre": "María González",
    "email": "maria@example.com",
    "password": "abc123"
  },
  "orderData": {
    "producto": "Laptop",
    "cantidad": 1,
    "total": 999.99
  }
}
```

Envía ese contenido a `POST /api/usuarios-con-orden`. Si falla la creación de la orden o del usuario, Sequelize ejecuta rollback.

## Autenticación JWT

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "status": "success",
  "message": "Login exitoso",
  "data": {
    "token": "eyJ...",
    "user": {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com"
    }
  }
}
```

### Ruta protegida

```http
GET /api/usuarios/protegidos
Authorization: Bearer <token>
```

## Características

- Conexión a PostgreSQL mediante Sequelize
- CRUD de usuarios con validaciones
- Relación 1:N entre usuarios y órdenes
- Búsqueda dinámica mediante query params
- Transacciones con rollback
- Middleware global de errores
- Autenticación con JWT
- Seeders con datos de prueba
- Arquitectura modular con controladores, servicios, modelos y rutas

## Autor

Marcel Navarrete Monrroy
