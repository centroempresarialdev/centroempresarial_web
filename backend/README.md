# Backend FastAPI — Centro Empresarial

Backend RESTful asíncrono desarrollado con **Python 3.11+**, **FastAPI**, **SQLModel** y **Neon PostgreSQL**, con integración de medios vía **Cloudinary** y microservicio anti-baneo para WhatsApp.

---

## 🚀 Inicio Rápido en Local

### 1. Crear y Activar Entorno Virtual

En PowerShell dentro de la carpeta `backend`:
```powershell
cd c:\Users\nalle\Desktop\CE\centroempresarial_web\backend
python -m venv venv
.\venv\Scripts\activate
```

### 2. Instalar Dependencias
```powershell
pip install -r requirements.txt
```

### 3. Configurar Variables de Entorno (`.env`)
Edita el archivo `.env` con tus credenciales reales:
- **`DATABASE_URL`**: Cadena agrupada de Neon (`postgresql+asyncpg://...@...-pooler.../neondb?ssl=require`).
- **`DATABASE_DIRECT_URL`**: Cadena directa de Neon (`postgresql://...@.../neondb?sslmode=require`).
- **`CLOUDINARY_*`**: Credenciales de tu cuenta de Cloudinary para almacenar flyers y logos.

### 4. Ejecutar Migraciones de Base de Datos
Genera y aplica el esquema relacional en Neon mediante Alembic:
```powershell
alembic revision --autogenerate -m "initial_schema"
alembic upgrade head
```

### 5. Crear el Administrador Inicial y Planes Base
Ejecuta el script seguro por línea de comandos:
```powershell
python -m app.cli.init_admin admin@centroempresarial.pe "TuPasswordSeguro2026!" "Director General"
```

### 6. Iniciar el Servidor FastAPI
```powershell
uvicorn app.main:app --reload --port 8000
```
- **Documentación Swagger UI interactiva:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Documentación ReDoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
- **Health Check:** [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

## 📱 Microservicio de WhatsApp (`whatsapp-service`)

Para habilitar el envío seguro de recordatorios de membresía:
```powershell
cd whatsapp-service
npm install
node index.js
```
Escanea el código QR que se imprimirá en la consola con el celular institucional. El servicio escuchará internamente en `http://127.0.0.1:3001` con retardo humano de 10 a 25 segundos por mensaje.

---

## 🐳 Lanzamiento con Docker (Recomendado)

El proyecto incluye configuración completa de Docker para levantar tanto el backend como el microservicio de WhatsApp con un solo comando.

### 1. Levantar contenedores
Desde la raíz del proyecto o dentro de `backend/`:
```powershell
docker compose up --build
```
Para ejecutar en segundo plano (detached):
```powershell
docker compose up --build -d
```

### 2. Ver logs y escanear QR de WhatsApp
```powershell
docker compose logs -f whatsapp_service
```

### 3. Ejecutar migraciones o comandos dentro del contenedor
```powershell
# Ejecutar migraciones de Alembic:
docker compose exec backend alembic revision --autogenerate -m "init"
docker compose exec backend alembic upgrade head

# Crear administrador inicial:
docker compose exec backend python -m app.cli.init_admin admin@centroempresarial.pe "TuPassword123!" "Director General"
```

### 4. Detener contenedores
```powershell
docker compose down
```

---

## 🧪 Pruebas Automatizadas

Para correr la suite de pruebas unitarias:
```powershell
# En local con venv:
pytest -v

# O dentro del contenedor Docker:
docker compose exec backend pytest -v
```
