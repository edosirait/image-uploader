# Image Uploader Project

This project is a simple image uploader using **Express.js**, **MongoDB (GridFS)**, and **Angular** for frontend.

---

## Backend Setup

### 1. Clone & Install Backend
```bash
git clone https://github.com/edosirait/image-uploader.git
cd image-uploader/backend-image-uploader
npm install
```

### 2. Dockerized MongoDB + Mongo Express
Make sure you have **Docker** and **Docker Compose** installed.

Create a `docker-compose.yml` inside `/backend-image-uploader` (if not exists):

```yaml
version: '3.8'

services:
  mongo:
    image: mongo:7
    container_name: image-mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    restart: always

  mongo-express:
    image: mongo-express
    ports:
      - "8081:8081"
    environment:
      - ME_CONFIG_MONGODB_SERVER=mongo
      - ME_CONFIG_BASICAUTH_USERNAME=admin
      - ME_CONFIG_BASICAUTH_PASSWORD=admin123
    depends_on:
      - mongo
    restart: always

volumes:
  mongo-data:
```

### 3. Run MongoDB Services
```bash
docker-compose up -d
```
- MongoDB: `mongodb://localhost:27017`
- Mongo Express UI: `http://localhost:8081` (login with `admin/admin123`)

### 4. Run Backend API
```bash
npm run dev
```
- The backend will run on: `http://localhost:3000`

---

## Frontend Setup

### 1. Install Frontend
```bash
cd ../frontend-image-uploader
npm install
```

### 2. Configure API Endpoint
Make sure the `/src/environments/environment.ts` points to your backend:
```typescript
export const environment = {
  production: false,
  API_URL: 'http://localhost:3000'
};
```

### 3. Run Frontend
```bash
ng serve
```
- The frontend will run on: `http://localhost:4200`

---

## Notes
- Make sure Docker containers are up before running the backend.
- All uploaded images will be stored in MongoDB via GridFS.

Happy coding! 🚀

