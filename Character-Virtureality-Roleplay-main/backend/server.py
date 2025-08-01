from fastapi import FastAPI, HTTPException, Depends, status, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
from pymongo import MongoClient
import uuid
from datetime import datetime, timedelta
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json
import asyncio
import httpx
from emergentintegrations.llm.chat import LlmChat, UserMessage

# Load environment variables
load_dotenv()

app = FastAPI(title="Character VR RP API", version="2.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/character_vr_rp')
client = MongoClient(MONGO_URL)
db = client.get_default_database()

# Collections
users_collection = db.users
characters_collection = db.characters
conversations_collection = db.conversations
messages_collection = db.messages
sessions_collection = db.sessions
multiplayer_rooms_collection = db.multiplayer_rooms
personas_collection = db.personas

# Security
security = HTTPBearer()

# AI Configuration
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')

# Available AI models
AVAILABLE_MODELS = {
    "openai": {
        "models": ["gpt-4.1", "gpt-4.1-mini", "gpt-4.1-nano", "o4-mini", "o3-mini", "o3", "o1-mini", "gpt-4o-mini", "gpt-4.5-preview", "gpt-4o", "o1", "o1-pro"],
        "default": "gpt-4.1"
    },
    "anthropic": {
        "models": ["claude-sonnet-4-20250514", "claude-opus-4-20250514", "claude-3-7-sonnet-20250219", "claude-3-5-haiku-20241022", "claude-3-5-sonnet-20241022"],
        "default": "claude-sonnet-4-20250514"
    },
    "gemini": {
        "models": ["gemini-2.5-flash-preview-04-17", "gemini-2.5-pro-preview-05-06", "gemini-2.0-flash", "gemini-2.0-flash-preview-image-generation", "gemini-2.0-flash-lite", "gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-1.5-pro"],
        "default": "gemini-2.0-flash"
    }
}

# Pydantic models
class User(BaseModel):
    user_id: str
    username: str
    email: str
    provider: str = "email"  # email, discord, google, apple, phone
    provider_id: Optional[str] = None
    avatar: Optional[str] = None
    preferences: Dict[str, Any] = {}
    created_at: datetime
    updated_at: datetime

class Session(BaseModel):
    session_id: str
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime

class Character(BaseModel):
    character_id: str
    name: str
    description: str
    personality: str
    avatar: Optional[str] = None
    ai_provider: str = "openai"
    ai_model: str = "gpt-4.1"
    system_prompt: str
    is_nsfw: bool = False
    is_multiplayer: bool = False
    created_by: str
    created_at: datetime
    updated_at: datetime

class MultiplayerRoom(BaseModel):
    room_id: str
    name: str
    description: str
    host_user_id: str
    character_id: str
    max_participants: int = 10
    participants: List[str] = []
    is_active: bool = True
    is_private: bool = False
    password: Optional[str] = None
    created_at: datetime
    updated_at: datetime

class Conversation(BaseModel):
    conversation_id: str
    user_id: str
    character_id: str
    room_id: Optional[str] = None  # For multiplayer
    title: str
    mode: str = "casual"  # casual, rp, rpg
    is_nsfw: bool = False
    ai_provider: str = "openai"
    ai_model: str = "gpt-4.1"
    created_at: datetime
    updated_at: datetime

class Message(BaseModel):
    message_id: str
    conversation_id: str
    room_id: Optional[str] = None
    sender: str  # user or character
    sender_id: str
    content: str
    timestamp: datetime
    ai_provider: Optional[str] = None
    ai_model: Optional[str] = None

class ChatRequest(BaseModel):
    conversation_id: str
    room_id: Optional[str] = None
    message: str
    ai_provider: Optional[str] = "openai"
    ai_model: Optional[str] = "gpt-4.1"
    persona_id: Optional[str] = None

class CreateCharacterRequest(BaseModel):
    name: str
    description: str
    personality: str
    avatar: Optional[str] = None
    ai_provider: str = "openai"
    ai_model: str = "gpt-4.1"
    system_prompt: str
    is_nsfw: bool = False
    is_multiplayer: bool = False

class CreateConversationRequest(BaseModel):
    character_id: str
    room_id: Optional[str] = None
    title: str
    mode: str = "casual"
    is_nsfw: bool = False
    ai_provider: str = "openai"
    ai_model: str = "gpt-4.1"

class CreateRoomRequest(BaseModel):
    name: str
    description: str
    character_id: str
    max_participants: int = 10
    is_private: bool = False
    password: Optional[str] = None

class AuthCallbackRequest(BaseModel):
    session_id: str

class Persona(BaseModel):
    persona_id: str
    user_id: str
    name: str
    description: str
    personality_traits: str
    avatar: Optional[str] = None
    preferences: Dict[str, Any] = {}
    is_default: bool = False
    created_at: datetime
    updated_at: datetime

class CreatePersonaRequest(BaseModel):
    name: str
    description: str
    personality_traits: str
    avatar: Optional[str] = None
    preferences: Dict[str, Any] = {}
    is_default: bool = False

class UpdatePersonaRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    personality_traits: Optional[str] = None
    avatar: Optional[str] = None
    preferences: Optional[Dict[str, Any]] = None
    is_default: Optional[bool] = None

# Helper functions
def get_api_key(provider: str) -> str:
    """Get API key for the specified provider"""
    if provider == "openai":
        return OPENAI_API_KEY if OPENAI_API_KEY and OPENAI_API_KEY != "demo_key_placeholder" else None
    elif provider == "anthropic":
        return ANTHROPIC_API_KEY if ANTHROPIC_API_KEY and ANTHROPIC_API_KEY != "demo_key_placeholder" else None
    elif provider == "gemini":
        key = os.environ.get('GEMINI_API_KEY')
        return key if key and key != "demo_key_placeholder" else None
    return None

def create_character_system_prompt(character: dict, mode: str = "casual", persona: Optional[dict] = None) -> str:
    """Create a system prompt for the character based on mode and user persona"""
    base_prompt = f"""You are {character['name']}, a character in Character VR RP with the following traits:

Description: {character['description']}
Personality: {character['personality']}

Custom Instructions: {character.get('system_prompt', '')}

"""
    
    if mode == "rp":
        base_prompt += """You are engaging in roleplay. Stay in character, be creative, and respond as if you are this character in a story or scene. Use descriptive language and actions in your responses. This is a VR environment, so you can describe virtual actions and interactions."""
    elif mode == "rpg":
        base_prompt += """You are in an RPG-style interaction. Think of this as a role-playing game where you can describe actions, environments, and consequences. Be engaging and interactive, allowing the user to make choices that affect the story. This is a VR environment with multiplayer capabilities."""
    elif mode == "casual":
        base_prompt += """You are having a casual conversation. Be friendly, engaging, and stay true to your character's personality while having a natural chat. This is a VR environment where users can interact with you."""
    
    if character.get('is_nsfw', False):
        base_prompt += "\n\nNote: This character supports mature/NSFW content when appropriate to the conversation."
    
    if character.get('is_multiplayer', False):
        base_prompt += "\n\nNote: This is a multiplayer environment. Multiple users may be present. Address users appropriately and be aware of group dynamics."
    
    # Add persona context if provided
    if persona:
        base_prompt += f"""

USER PERSONA CONTEXT:
You are chatting with {persona['name']}:
- Description: {persona['description']}
- Personality Traits: {persona['personality_traits']}

Please keep this persona in mind when responding, but respond naturally as your character {character['name']}."""
    
    return base_prompt

async def verify_session(session_id: str) -> Optional[dict]:
    """Verify session with Emergent Auth API"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
                headers={"X-Session-ID": session_id}
            )
            if response.status_code == 200:
                return response.json()
            return None
    except Exception as e:
        print(f"Session verification error: {e}")
        return None

async def create_default_persona(user_id: str, username: str) -> str:
    """Create a default persona for a new user"""
    persona_id = str(uuid.uuid4())
    default_persona = Persona(
        persona_id=persona_id,
        user_id=user_id,
        name=username or "Me",
        description=f"The default persona for {username or 'this user'}",
        personality_traits="Friendly, curious, and engaging",
        avatar=None,
        preferences={},
        is_default=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    personas_collection.insert_one(default_persona.dict())
    return persona_id

async def get_current_user(x_session_id: str = Header(None)) -> Optional[dict]:
    """Get current user from session"""
    if not x_session_id:
        return None
    
    # Check local session
    session = sessions_collection.find_one({"session_id": x_session_id})
    if session and session["expires_at"] > datetime.utcnow():
        user = users_collection.find_one({"user_id": session["user_id"]}, {"_id": 0})
        return user
    
    return None

# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Character VR RP API is running"}

# Authentication endpoints
@app.post("/api/auth/callback")
async def auth_callback(request: AuthCallbackRequest):
    """Handle authentication callback from Emergent Auth"""
    try:
        # Verify session with Emergent Auth
        session_data = await verify_session(request.session_id)
        if not session_data:
            raise HTTPException(status_code=401, detail="Invalid session")
        
        # Create or update user
        user_id = session_data.get("id")
        email = session_data.get("email")
        name = session_data.get("name")
        picture = session_data.get("picture")
        session_token = session_data.get("session_token")
        
        # Check if user exists
        existing_user = users_collection.find_one({"email": email})
        if not existing_user:
            # Create new user
            user = User(
                user_id=user_id,
                username=name,
                email=email,
                provider="emergent",
                provider_id=user_id,
                avatar=picture,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            users_collection.insert_one(user.dict())
            
            # Create default persona for new user
            await create_default_persona(user_id, name)
        else:
            user_id = existing_user["user_id"]
            
            # Check if user has any personas, if not create default
            persona_count = personas_collection.count_documents({"user_id": user_id})
            if persona_count == 0:
                await create_default_persona(user_id, existing_user.get("username", "User"))
        
        # Create session
        session = Session(
            session_id=request.session_id,
            user_id=user_id,
            session_token=session_token,
            expires_at=datetime.utcnow() + timedelta(days=7),
            created_at=datetime.utcnow()
        )
        sessions_collection.insert_one(session.dict())
        
        return {"message": "Authentication successful", "user_id": user_id}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Authentication error: {str(e)}")

@app.post("/api/auth/phone")
async def phone_auth(phone_number: str):
    """Handle phone number authentication (placeholder)"""
    # This would integrate with a service like Twilio for SMS verification
    return {"message": "Phone authentication not implemented yet", "phone_number": phone_number}


@app.get("/api/auth/google")
async def google_auth():
    """Redirect to Google OAuth"""
    # This would redirect to Google OAuth
    return {"url": "https://accounts.google.com/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=openid email profile"}

@app.get("/api/auth/apple")
async def apple_auth():
    """Redirect to Apple OAuth"""
    # This would redirect to Apple OAuth
    return {"url": "https://appleid.apple.com/auth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=name email"}

# User management
@app.post("/api/users")
async def create_user(username: str, email: str):
    """Legacy user creation endpoint"""
    user_id = str(uuid.uuid4())
    user = User(
        user_id=user_id,
        username=username,
        email=email,
        provider="legacy",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    users_collection.insert_one(user.dict())
    
    # Create default persona for new user
    await create_default_persona(user_id, username)
    
    return {"user_id": user_id, "message": "User created successfully"}

@app.get("/api/users/{user_id}")
async def get_user(user_id: str):
    user = users_collection.find_one({"user_id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/api/users/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current user information"""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return current_user

# Persona management
@app.post("/api/personas")
async def create_persona(persona_data: CreatePersonaRequest, current_user: dict = Depends(get_current_user)):
    """Create a new persona for the current user"""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    persona_id = str(uuid.uuid4())
    
    # If this is set as default, remove default from other personas
    if persona_data.is_default:
        personas_collection.update_many(
            {"user_id": current_user["user_id"]},
            {"$set": {"is_default": False}}
        )
    
    persona = Persona(
        persona_id=persona_id,
        user_id=current_user["user_id"],
        name=persona_data.name,
        description=persona_data.description,
        personality_traits=persona_data.personality_traits,
        avatar=persona_data.avatar,
        preferences=persona_data.preferences,
        is_default=persona_data.is_default,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    personas_collection.insert_one(persona.dict())
    return {"persona_id": persona_id, "message": "Persona created successfully"}

@app.get("/api/personas")
async def get_user_personas(current_user: dict = Depends(get_current_user)):
    """Get all personas for the current user"""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    personas = list(personas_collection.find({"user_id": current_user["user_id"]}, {"_id": 0}).sort("created_at", -1))
    return {"personas": personas}

@app.get("/api/personas/{persona_id}")
async def get_persona(persona_id: str, current_user: dict = Depends(get_current_user)):
    """Get a specific persona"""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    persona = personas_collection.find_one({
        "persona_id": persona_id,
        "user_id": current_user["user_id"]
    }, {"_id": 0})
    
    if not persona:
        raise HTTPException(status_code=404, detail="Persona not found")
    
    return persona

@app.put("/api/personas/{persona_id}")
async def update_persona(persona_id: str, persona_data: UpdatePersonaRequest, current_user: dict = Depends(get_current_user)):
    """Update a persona"""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    persona = personas_collection.find_one({
        "persona_id": persona_id,
        "user_id": current_user["user_id"]
    })
    
    if not persona:
        raise HTTPException(status_code=404, detail="Persona not found")
    
    # Prepare update data
    update_data = {"updated_at": datetime.utcnow()}
    
    if persona_data.name is not None:
        update_data["name"] = persona_data.name
    if persona_data.description is not None:
        update_data["description"] = persona_data.description
    if persona_data.personality_traits is not None:
        update_data["personality_traits"] = persona_data.personality_traits
    if persona_data.avatar is not None:
        update_data["avatar"] = persona_data.avatar
    if persona_data.preferences is not None:
        update_data["preferences"] = persona_data.preferences
    
    # Handle default persona logic
    if persona_data.is_default is not None:
        if persona_data.is_default:
            # Remove default from other personas
            personas_collection.update_many(
                {"user_id": current_user["user_id"], "persona_id": {"$ne": persona_id}},
                {"$set": {"is_default": False}}
            )
        update_data["is_default"] = persona_data.is_default
    
    personas_collection.update_one(
        {"persona_id": persona_id},
        {"$set": update_data}
    )
    
    return {"message": "Persona updated successfully"}

@app.delete("/api/personas/{persona_id}")
async def delete_persona(persona_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a persona"""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    persona = personas_collection.find_one({
        "persona_id": persona_id,
        "user_id": current_user["user_id"]
    })
    
    if not persona:
        raise HTTPException(status_code=404, detail="Persona not found")
    
    # Don't allow deleting the last persona
    persona_count = personas_collection.count_documents({"user_id": current_user["user_id"]})
    if persona_count <= 1:
        raise HTTPException(status_code=400, detail="Cannot delete the last persona")
    
    # If deleting default persona, make another one default
    if persona["is_default"]:
        other_persona = personas_collection.find_one({
            "user_id": current_user["user_id"],
            "persona_id": {"$ne": persona_id}
        })
        if other_persona:
            personas_collection.update_one(
                {"persona_id": other_persona["persona_id"]},
                {"$set": {"is_default": True}}
            )
    
    personas_collection.delete_one({"persona_id": persona_id})
    return {"message": "Persona deleted successfully"}

@app.get("/api/personas/default")
async def get_default_persona(current_user: dict = Depends(get_current_user)):
    """Get the default persona for the current user"""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    persona = personas_collection.find_one({
        "user_id": current_user["user_id"],
        "is_default": True
    }, {"_id": 0})
    
    if not persona:
        # If no default persona exists, return the first one and make it default
        persona = personas_collection.find_one({"user_id": current_user["user_id"]}, {"_id": 0})
        if persona:
            personas_collection.update_one(
                {"persona_id": persona["persona_id"]},
                {"$set": {"is_default": True}}
            )
            persona["is_default"] = True
    
    return persona or {}

@app.post("/api/personas/{persona_id}/set-default")
async def set_default_persona(persona_id: str, current_user: dict = Depends(get_current_user)):
    """Set a persona as the default"""
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    persona = personas_collection.find_one({
        "persona_id": persona_id,
        "user_id": current_user["user_id"]
    })
    
    if not persona:
        raise HTTPException(status_code=404, detail="Persona not found")
    
    # Remove default from all personas
    personas_collection.update_many(
        {"user_id": current_user["user_id"]},
        {"$set": {"is_default": False}}
    )
    
    # Set this persona as default
    personas_collection.update_one(
        {"persona_id": persona_id},
        {"$set": {"is_default": True}}
    )
    
    return {"message": "Default persona updated successfully"}

# Character management
@app.post("/api/characters")
async def create_character(character_data: CreateCharacterRequest, current_user: dict = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    character_id = str(uuid.uuid4())
    character = Character(
        character_id=character_id,
        name=character_data.name,
        description=character_data.description,
        personality=character_data.personality,
        avatar=character_data.avatar,
        ai_provider=character_data.ai_provider,
        ai_model=character_data.ai_model,
        system_prompt=character_data.system_prompt,
        is_nsfw=character_data.is_nsfw,
        is_multiplayer=character_data.is_multiplayer,
        created_by=current_user["user_id"],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    characters_collection.insert_one(character.dict())
    return {"character_id": character_id, "message": "Character created successfully"}

@app.get("/api/characters")
async def get_characters(skip: int = 0, limit: int = 20, multiplayer_only: bool = False):
    filter_query = {}
    if multiplayer_only:
        filter_query["is_multiplayer"] = True
    
    characters = list(characters_collection.find(filter_query, {"_id": 0}).skip(skip).limit(limit))
    return {"characters": characters}

@app.get("/api/characters/{character_id}")
async def get_character(character_id: str):
    character = characters_collection.find_one({"character_id": character_id}, {"_id": 0})
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")
    return character

# Multiplayer room management
@app.post("/api/rooms")
async def create_room(room_data: CreateRoomRequest, current_user: dict = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    room_id = str(uuid.uuid4())
    room = MultiplayerRoom(
        room_id=room_id,
        name=room_data.name,
        description=room_data.description,
        host_user_id=current_user["user_id"],
        character_id=room_data.character_id,
        max_participants=room_data.max_participants,
        participants=[current_user["user_id"]],
        is_private=room_data.is_private,
        password=room_data.password,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    multiplayer_rooms_collection.insert_one(room.dict())
    return {"room_id": room_id, "message": "Room created successfully"}

@app.get("/api/rooms")
async def get_rooms(skip: int = 0, limit: int = 20):
    rooms = list(multiplayer_rooms_collection.find({"is_active": True, "is_private": False}, {"_id": 0}).skip(skip).limit(limit))
    return {"rooms": rooms}

@app.get("/api/rooms/{room_id}")
async def get_room(room_id: str):
    room = multiplayer_rooms_collection.find_one({"room_id": room_id}, {"_id": 0})
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room

@app.post("/api/rooms/{room_id}/join")
async def join_room(room_id: str, password: Optional[str] = None, current_user: dict = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    room = multiplayer_rooms_collection.find_one({"room_id": room_id})
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    if room["is_private"] and room["password"] != password:
        raise HTTPException(status_code=403, detail="Invalid password")
    
    if len(room["participants"]) >= room["max_participants"]:
        raise HTTPException(status_code=403, detail="Room is full")
    
    if current_user["user_id"] not in room["participants"]:
        multiplayer_rooms_collection.update_one(
            {"room_id": room_id},
            {"$push": {"participants": current_user["user_id"]}, "$set": {"updated_at": datetime.utcnow()}}
        )
    
    return {"message": "Joined room successfully"}

@app.post("/api/rooms/{room_id}/leave")
async def leave_room(room_id: str, current_user: dict = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    room = multiplayer_rooms_collection.find_one({"room_id": room_id})
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    if current_user["user_id"] in room["participants"]:
        multiplayer_rooms_collection.update_one(
            {"room_id": room_id},
            {"$pull": {"participants": current_user["user_id"]}, "$set": {"updated_at": datetime.utcnow()}}
        )
    
    return {"message": "Left room successfully"}

# Conversation management
@app.post("/api/conversations")
async def create_conversation(conversation_data: CreateConversationRequest, current_user: dict = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    conversation_id = str(uuid.uuid4())
    conversation = Conversation(
        conversation_id=conversation_id,
        user_id=current_user["user_id"],
        character_id=conversation_data.character_id,
        room_id=conversation_data.room_id,
        title=conversation_data.title,
        mode=conversation_data.mode,
        is_nsfw=conversation_data.is_nsfw,
        ai_provider=conversation_data.ai_provider,
        ai_model=conversation_data.ai_model,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    conversations_collection.insert_one(conversation.dict())
    return {"conversation_id": conversation_id, "message": "Conversation created successfully"}

@app.get("/api/conversations/{user_id}")
async def get_user_conversations(user_id: str):
    conversations = list(conversations_collection.find({"user_id": user_id}, {"_id": 0}))
    return {"conversations": conversations}

@app.get("/api/conversations/{conversation_id}/messages")
async def get_conversation_messages(conversation_id: str):
    messages = list(messages_collection.find({"conversation_id": conversation_id}, {"_id": 0}).sort("timestamp", 1))
    return {"messages": messages}

@app.get("/api/rooms/{room_id}/messages")
async def get_room_messages(room_id: str):
    messages = list(messages_collection.find({"room_id": room_id}, {"_id": 0}).sort("timestamp", 1))
    return {"messages": messages}

# AI Chat endpoint
@app.post("/api/chat")
async def chat(chat_request: ChatRequest, current_user: dict = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        # Get conversation or room details
        if chat_request.room_id:
            room = multiplayer_rooms_collection.find_one({"room_id": chat_request.room_id})
            if not room:
                raise HTTPException(status_code=404, detail="Room not found")
            character = characters_collection.find_one({"character_id": room["character_id"]})
            context_id = chat_request.room_id
        else:
            conversation = conversations_collection.find_one({"conversation_id": chat_request.conversation_id})
            if not conversation:
                raise HTTPException(status_code=404, detail="Conversation not found")
            character = characters_collection.find_one({"character_id": conversation["character_id"]})
            context_id = chat_request.conversation_id
        
        if not character:
            raise HTTPException(status_code=404, detail="Character not found")
        
        # Get persona if specified
        persona = None
        if chat_request.persona_id:
            persona = personas_collection.find_one({
                "persona_id": chat_request.persona_id,
                "user_id": current_user["user_id"]
            }, {"_id": 0})
        else:
            # Use default persona if no specific persona provided
            persona = personas_collection.find_one({
                "user_id": current_user["user_id"],
                "is_default": True
            }, {"_id": 0})
        
        # Use request AI settings
        ai_provider = chat_request.ai_provider or "openai"
        ai_model = chat_request.ai_model or "gpt-4.1"
        
        # Save user message first
        user_message_id = str(uuid.uuid4())
        user_message = Message(
            message_id=user_message_id,
            conversation_id=chat_request.conversation_id,
            room_id=chat_request.room_id,
            sender="user",
            sender_id=current_user["user_id"],
            content=chat_request.message,
            timestamp=datetime.utcnow()
        )
        messages_collection.insert_one(user_message.dict())
        
        # Get API key
        api_key = get_api_key(ai_provider)
        if not api_key:
            # Return a mock response when no API key is available
            ai_message_id = str(uuid.uuid4())
            mock_response = f"Hello! I'm {character['name']}. I'd love to chat with you, but the AI service isn't configured yet. Please add your API keys to enable full AI functionality!"
            
            ai_message = Message(
                message_id=ai_message_id,
                conversation_id=chat_request.conversation_id,
                room_id=chat_request.room_id,
                sender="character",
                sender_id=character["character_id"],
                content=mock_response,
                timestamp=datetime.utcnow(),
                ai_provider=ai_provider,
                ai_model=ai_model
            )
            messages_collection.insert_one(ai_message.dict())
            
            return {
                "user_message": user_message.dict(),
                "ai_response": ai_message.dict(),
                "ai_provider": ai_provider,
                "ai_model": ai_model,
                "persona_used": persona,
                "note": "Mock response - API key not configured"
            }
        
        # Continue with normal AI processing
        # Create system prompt based on character, mode, and persona
        mode = "casual"  # Default mode
        if not chat_request.room_id:
            mode = conversation.get("mode", "casual")
        
        system_prompt = create_character_system_prompt(character, mode, persona)
        
        # Create AI chat instance
        chat_instance = LlmChat(
            api_key=api_key,
            session_id=context_id,
            system_message=system_prompt
        ).with_model(ai_provider, ai_model)
        
        # Send message to AI
        user_msg = UserMessage(text=chat_request.message)
        ai_response = await chat_instance.send_message(user_msg)
        
        # Save AI response
        ai_message_id = str(uuid.uuid4())
        ai_message = Message(
            message_id=ai_message_id,
            conversation_id=chat_request.conversation_id,
            room_id=chat_request.room_id,
            sender="character",
            sender_id=character["character_id"],
            content=ai_response,
            timestamp=datetime.utcnow(),
            ai_provider=ai_provider,
            ai_model=ai_model
        )
        messages_collection.insert_one(ai_message.dict())
        
        return {
            "user_message": user_message.dict(),
            "ai_response": ai_message.dict(),
            "ai_provider": ai_provider,
            "ai_model": ai_model,
            "persona_used": persona
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

# AI providers endpoint
@app.get("/api/ai-providers")
async def get_ai_providers():
    providers = []
    
    for provider, config in AVAILABLE_MODELS.items():
        api_key = get_api_key(provider)
        providers.append({
            "id": provider,
            "name": provider.title(),
            "available": api_key is not None,
            "models": config["models"],
            "default_model": config["default"]
        })
    
    return {"providers": providers}

# Update conversation AI settings
@app.put("/api/conversations/{conversation_id}/ai-settings")
async def update_conversation_ai_settings(conversation_id: str, ai_provider: str, ai_model: str):
    conversation = conversations_collection.find_one({"conversation_id": conversation_id})
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    if ai_provider not in AVAILABLE_MODELS:
        raise HTTPException(status_code=400, detail=f"Invalid AI provider: {ai_provider}")
    
    if ai_model not in AVAILABLE_MODELS[ai_provider]["models"]:
        raise HTTPException(status_code=400, detail=f"Invalid model for {ai_provider}: {ai_model}")
    
    conversations_collection.update_one(
        {"conversation_id": conversation_id},
        {"$set": {"ai_provider": ai_provider, "ai_model": ai_model, "updated_at": datetime.utcnow()}}
    )
    
    return {"message": "AI settings updated successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)