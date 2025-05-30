# Plataforma de Compra/Venta de Energía

Este proyecto es una plataforma web para la compra y venta de energía entre usuarios. Implementa un backend con Node.js, Express y MongoDB, y un frontend en React con TypeScript y Vite.

---

## 🧩 Funcionalidades

- **Registro y Login** con JWT
- **Dashboard de vendedor**:
  - Crear nuevas ofertas con ventana de validez
  - Ver interfaz limpia con botón para publicar oferta
- **Dashboard de comprador**:
  - Visualiza ofertas activas
  - Compra ofertas si están dentro del tiempo válido
- **Websockets**:
  - Notificación en tiempo real cuando se compra una oferta
  - Notificación cuando una oferta expira
- **Cron job** que expira ofertas automáticamente según su `windowEnd`
- **Validación de fecha y estado en backend** antes de aceptar una compra

---

## ⚙️ Tecnologías

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcrypt
- cors
- dotenv
- node-cron
- socket.io

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

---

## 📦 Instalación

### Back

```bash
cd backend
npm install
npm run dev
```

## 🛠️ Configuración del archivo `.env`

Crea un archivo `.env` en la carpeta `back` con el siguiente contenido:

```ini
PORT= Your port
MONGO_URI=mongodb+srv://ajrey1282:<db_password>@ercodb.h8pai9x.mongodb.net/
JWT_SECRET= your password
```

---

## 🚀 Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📲 Rutas

### Autenticación

- `POST /api/auth/register` → registro de usuario
- `POST /api/auth/login` → login y retorna token

### Ofertas

- `POST /api/offers` → crear oferta (vendedor)
- `GET /api/offers/active` → listar ofertas activas (comprador)
- `POST /api/offers/:id/buy` → comprar oferta

---

## 🧠 Lógica clave

- Una oferta solo puede comprarse si:
  - Su estado es `"active"`
  - La fecha actual está entre `windowStart` y `windowEnd`
- Las ofertas se vencen automáticamente cada minuto mediante un cron job, actualizando su estado a `"expired"` si ya pasó su `windowEnd`.

### Eventos socket.io

- `offerBought` → se emite cuando alguien compra una oferta
- `offersExpired` → se emite cuando se expiran automáticamente

---

## 📁 Estructura de carpetas

```css
backend/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── jobs/
  ├── app.js
  └── server.js

frontend/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── App.tsx
  │   └── main.tsx
```

---

##  Próximos pasos

- Mejorar validaciones frontend (formato de fecha, campos vacíos)
- Mostrar historial de transacciones por usuario
- Panel para ver ofertas propias

---

## 🚀 Despliegue

[erco](https://erco-market.vercel.app/)

## 🧑‍💻 Autor

Desarrollado por Alberto Rey para prueba técnica de ERCO
