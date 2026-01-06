from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
import os
from typing import Optional, List
from dotenv import load_dotenv # <--- IMPORTANTE: Importar esto

# Cargar variables de entorno desde .env
load_dotenv() 

# Configuración
app = FastAPI(title="LugoDev Portfolio API")

# CORS (Crucial para comunicación con Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Client (Server Side)
SUPABASE_URL = os.getenv("SUPABASE_URL")
# Intenta leer SERVICE_ROLE, si no existe, usa la KEY normal
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY")

# Validación temprana para evitar errores extraños
if not SUPABASE_URL:
    raise ValueError("❌ Error: SUPABASE_URL no encontrada en .env")
if not SUPABASE_KEY:
    raise ValueError("❌ Error: SUPABASE_KEY no encontrada en .env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Modelos Pydantic
class ContactForm(BaseModel):
    name: str
    email: str
    content: str

class ProjectCreate(BaseModel):
    title: str
    description: str
    tags: List[str]
    image_url: str
    repo_url: Optional[str] = None
    demo_url: Optional[str] = None

# Dependencia para verificar Auth
async def verify_admin(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Header")
    token = authorization.split(" ")[1]
    # Verificar usuario
    user = supabase.auth.get_user(token)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return user

# Endpoints
@app.get("/")
def read_root():
    return {"status": "active", "system": "LugoDev Backend v1.0"}

@app.post("/api/contact")
def send_message(form: ContactForm):
    try:
        data = supabase.table("messages").insert(form.dict()).execute()
        return {"status": "success", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/projects")
def create_project(project: ProjectCreate, user = Depends(verify_admin)):
    try:
        data = supabase.table("projects").insert(project.dict()).execute()
        return {"status": "created", "project": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))