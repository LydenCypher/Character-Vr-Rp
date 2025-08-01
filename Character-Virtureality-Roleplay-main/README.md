# Character VR RP - Virtual Reality Role-Playing Platform

## Overview

Character VR RP is a full-stack VR-enabled role-playing platform that allows users to interact with AI-powered characters in immersive virtual environments. The application supports multiple AI providers, persona management, multiplayer interactions, and sophisticated character customization.

## Features

### Core Features
- **AI-Powered Characters**: Create and interact with intelligent AI characters using OpenAI, Anthropic Claude, or Google Gemini
- **Persona Management**: Create personalized user personas that influence AI interactions
- **Multiple Chat Modes**: Casual conversations, Role-Playing (RP), and RPG-style interactions
- **VR-Ready**: Built with VR integration capabilities
- **Multiplayer Support**: Join rooms and interact with characters alongside other users
- **Social Authentication**: Login with Google, Discord, or Apple accounts

### AI Integration
- **Multi-Provider Support**: OpenAI GPT models, Anthropic Claude, Google Gemini
- **Context-Aware Conversations**: AI maintains conversation history and character context
- **NSFW Content Support**: Optional mature content handling
- **Custom System Prompts**: Fully customizable character personalities and behaviors

### Advanced Features
- **Session Management**: Persistent conversations with proper session handling
- **Real-time Messaging**: Live chat interactions with AI characters
- **Character Customization**: Rich character creation with personality traits, descriptions, and AI model selection
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **MongoDB**: NoSQL database for data persistence
- **emergentintegrations**: Multi-provider AI integration library
- **Authentication**: Social OAuth integration
- **Docker**: Containerized deployment

### Frontend
- **React 18**: Modern React with hooks and context
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication
- **Responsive Design**: Mobile-first approach

## Installation

### Prerequisites
- Python 3.11+
- Node.js 16+
- MongoDB
- Docker (optional)

### Environment Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd character-vr-rp
```

2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
```

3. **Frontend Setup**
```bash
cd frontend
yarn install
```

4. **Environment Variables**

Create `.env` files in both backend and frontend directories by copying the template files:

**Backend Setup:**
```bash
cd backend
cp .env.template .env
# Edit .env and add your actual API keys
```

**Backend (.env):**
```env
MONGO_URL=mongodb://localhost:27017/ai_character_app
OPENAI_API_KEY=your_actual_openai_api_key
ANTHROPIC_API_KEY=your_actual_anthropic_api_key
GEMINI_API_KEY=your_actual_gemini_api_key
JWT_SECRET_KEY=your_actual_jwt_secret_key
```

**Frontend Setup:**
```bash
cd frontend
cp .env.template .env
# Edit .env and set your backend URL
```

**Frontend (.env):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

⚠️ **IMPORTANT**: Never commit `.env` files to version control. They contain sensitive API keys.

## Running the Application

### Development Mode

1. **Start MongoDB**
```bash
mongod --dbpath /path/to/your/db
```

2. **Start Backend**
```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

3. **Start Frontend**
```bash
cd frontend
yarn start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- API Documentation: http://localhost:8001/docs

### Production Deployment

The application is configured for containerized deployment with proper service management.

## API Documentation

### Authentication Endpoints
- `POST /api/auth/callback` - Handle OAuth authentication
- `GET /api/auth/google` - Google OAuth redirect
- `GET /api/auth/discord` - Discord OAuth redirect
- `GET /api/auth/apple` - Apple OAuth redirect

### User Management
- `POST /api/users` - Create user (legacy)
- `GET /api/users/{user_id}` - Get user details
- `GET /api/users/me` - Get current user info

### Character Management
- `POST /api/characters` - Create character
- `GET /api/characters` - List characters
- `GET /api/characters/{character_id}` - Get character details

### Persona Management
- `POST /api/personas` - Create persona
- `GET /api/personas` - List user personas
- `GET /api/personas/{persona_id}` - Get persona details
- `PUT /api/personas/{persona_id}` - Update persona
- `DELETE /api/personas/{persona_id}` - Delete persona
- `GET /api/personas/default` - Get default persona
- `POST /api/personas/{persona_id}/set-default` - Set default persona

### Conversation Management
- `POST /api/conversations` - Create conversation
- `GET /api/conversations/{user_id}` - Get user conversations
- `GET /api/conversations/{conversation_id}/messages` - Get conversation messages

### AI Chat
- `POST /api/chat` - Send message to AI character
- `GET /api/ai-providers` - Get available AI providers
- `PUT /api/conversations/{conversation_id}/ai-settings` - Update AI settings

### Multiplayer
- `POST /api/rooms` - Create multiplayer room
- `GET /api/rooms` - List public rooms
- `POST /api/rooms/{room_id}/join` - Join room
- `POST /api/rooms/{room_id}/leave` - Leave room

## Architecture

### Data Flow
1. User authenticates via social login
2. Frontend receives session token
3. User creates/selects characters and personas
4. Conversations are initiated with AI characters
5. Messages are processed through AI providers
6. Responses are stored and displayed in real-time

### Database Schema
- **Users**: User profiles and authentication data
- **Characters**: AI character definitions and configurations
- **Personas**: User persona profiles for contextual interactions
- **Conversations**: Chat session metadata
- **Messages**: Individual chat messages and AI responses
- **Sessions**: Authentication sessions
- **Rooms**: Multiplayer room configurations

## Configuration

### AI Providers
The application supports multiple AI providers through the emergentintegrations library:

- **OpenAI**: GPT-4.1, GPT-4o, O1 series models
- **Anthropic**: Claude Sonnet, Opus, Haiku models
- **Google**: Gemini 2.0/2.5 Flash and Pro models

### Chat Modes
- **Casual**: Natural conversation mode
- **RP (Role-Playing)**: Immersive character roleplay
- **RPG**: Game-style interactions with choices and consequences

## Security

- Social OAuth authentication
- Session-based authorization
- User data isolation
- API rate limiting
- Input validation and sanitization

## Testing

### Backend Testing
```bash
cd backend
python -m pytest
```

### Frontend Testing
```bash
cd frontend
yarn test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the API documentation at `/docs`
- Review the test results in `test_result.md`

## Roadmap

- [ ] Enhanced VR integration
- [ ] Voice chat capabilities
- [ ] Video avatar support
- [ ] Advanced multiplayer features
- [ ] Mobile app development
- [ ] Additional AI provider integrations

---

**Character VR RP** - Enter the Virtual Reality Role-Playing Universe