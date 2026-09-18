# Módulo 7 - Node.js + Express + Sequelize

Proyecto de backend para gestión de usuarios y órdenes con PostgreSQL y Sequelize.

## Requisitos

- Node.js v18 o superior
- PostgreSQL instalado y corriendo

## Instalació´´´n

```bash
git clone https://github.com/starkdotwav/mod-7.git
cd mod-7
npm install
```

## Configuració´´´n

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de PostgreSQL.

## Base de datos

Crea la base de datos en PostgreSQL:

```sql
CREATE DATABASE modulo7_db;
```

Sequelize creará´´ ´automá´´ ´ticamente las tablas `usuarios` y `ordenes` al iniciar el servidor.

## Ejecució´´´n

```bash
npm run dev
```

El servidor correrá´´ ´ en `http://localhost:3000`.

## Endpoints

| Méé´´todo | Ruta | Descripció´´´n |
|--------|------|-------------|
| GET | `/api/usuarios` | Listar usuarios |
| GET | `/api/usuarios/:id` | Obtener un usuario |
| POST | `/api/usuarios` | Crear un usuario |
| PUT | `/api/usuarios/:id` | Actualizar un usuario |
| DELETE | `/api/usuarios/:id` | Eliminar un usuario |
| GET | `/api/usuarios/:id/pedidos` | Obtener usuario con sus óó´´´rdenes |
| POST | `/api/usuarios-con-orden` | Crear usuario y orden con transacció´´´n |

## Ejemplo de creació´´´n de usuario

```json
POST /api/usuarios
Content-Type: application/json

{
  "nombre": "Juan Péé´´rez",
  "email": "juan@example.com",
  "password": "123456"
}
```

## Ejemplo de transacció´´´n

```json
POST /api/usuarios-con-orden
Content-Type: application/json

{
  "userData": {
    "nombre": "Marí´´ ´a Gonzá´´ ´lez",
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

## Autor

Marcel Navarrete Monrroy

## Licencia

MIT
