from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
import os
from typing import Optional, List

# Configuración
app = FastAPI(title="LugoDev Portfolio API")

# CORS (Crucial para comunicación con Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Ajustar en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Client (Server Side)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") # Usar Service Role para escritura segura
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

# Dependencia para verificar Auth (Simplificada para demo)
async def verify_admin(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Header")
    token = authorization.split(" ")[1]
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
        # Se asume que la imagen ya se subió al Storage desde el Frontend y aquí solo guardamos la URL
        data = supabase.table("projects").insert(project.dict()).execute()
        return {"status": "created", "project": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))