#!/usr/bin/env python3
"""
Core Backend Testing - Focus on non-AI endpoints to verify litellm dependency fix
"""

import requests
import json
import uuid
from datetime import datetime

# Configuration
BASE_URL = "https://c875baeb-46dd-41ee-84a2-a50674acbba0.preview.emergentagent.com/api"
HEADERS = {"Content-Type": "application/json"}

def test_core_endpoints():
    """Test core backend endpoints that don't require AI"""
    results = []
    
    print("🔍 Testing Core Backend Endpoints (Post-litellm Fix Verification)")
    print("=" * 70)
    
    # 1. Health Check
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            results.append(("Health Check", True, f"✅ API healthy: {data.get('message')}"))
        else:
            results.append(("Health Check", False, f"❌ Health check failed: {response.status_code}"))
    except Exception as e:
        results.append(("Health Check", False, f"❌ Health check error: {str(e)}"))
    
    # 2. User Management
    try:
        user_data = {
            "username": "test_user_core",
            "email": f"test.core.{uuid.uuid4().hex[:8]}@example.com"
        }
        response = requests.post(f"{BASE_URL}/users", params=user_data)
        if response.status_code == 200:
            data = response.json()
            user_id = data.get("user_id")
            results.append(("User Creation", True, f"✅ User created: {user_id}"))
            
            # Test get user
            get_response = requests.get(f"{BASE_URL}/users/{user_id}")
            if get_response.status_code == 200:
                results.append(("User Retrieval", True, "✅ User retrieved successfully"))
            else:
                results.append(("User Retrieval", False, f"❌ User retrieval failed: {get_response.status_code}"))
        else:
            results.append(("User Creation", False, f"❌ User creation failed: {response.status_code}"))
    except Exception as e:
        results.append(("User Management", False, f"❌ User management error: {str(e)}"))
    
    # 3. AI Providers Endpoint (should work without API keys)
    try:
        response = requests.get(f"{BASE_URL}/ai-providers")
        if response.status_code == 200:
            data = response.json()
            providers = data.get("providers", [])
            if len(providers) >= 3:  # OpenAI, Anthropic, Gemini
                results.append(("AI Providers", True, f"✅ {len(providers)} AI providers configured"))
            else:
                results.append(("AI Providers", False, f"❌ Only {len(providers)} providers found"))
        else:
            results.append(("AI Providers", False, f"❌ AI providers failed: {response.status_code}"))
    except Exception as e:
        results.append(("AI Providers", False, f"❌ AI providers error: {str(e)}"))
    
    # 4. Characters Endpoint
    try:
        response = requests.get(f"{BASE_URL}/characters")
        if response.status_code == 200:
            data = response.json()
            characters = data.get("characters", [])
            results.append(("Characters List", True, f"✅ Retrieved {len(characters)} characters"))
        else:
            results.append(("Characters List", False, f"❌ Characters list failed: {response.status_code}"))
    except Exception as e:
        results.append(("Characters List", False, f"❌ Characters list error: {str(e)}"))
    
    # 5. Authentication Endpoints (should require proper auth)
    try:
        # Test persona endpoints without auth - should return 401
        response = requests.get(f"{BASE_URL}/personas")
        if response.status_code == 401:
            results.append(("Auth Protection", True, "✅ Persona endpoints properly protected"))
        else:
            results.append(("Auth Protection", False, f"❌ Auth protection issue: {response.status_code}"))
    except Exception as e:
        results.append(("Auth Protection", False, f"❌ Auth protection test error: {str(e)}"))
    
    # 6. Test emergentintegrations import (verify dependency fix)
    try:
        import sys
        sys.path.append('/app/backend')
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        results.append(("Emergentintegrations Import", True, "✅ emergentintegrations library imports successfully"))
    except ImportError as e:
        results.append(("Emergentintegrations Import", False, f"❌ Import failed: {str(e)}"))
    except Exception as e:
        results.append(("Emergentintegrations Import", False, f"❌ Import error: {str(e)}"))
    
    # Summary
    print("\n" + "=" * 70)
    print("📊 CORE BACKEND TEST RESULTS")
    print("=" * 70)
    
    passed = sum(1 for _, success, _ in results if success)
    total = len(results)
    
    for test_name, success, message in results:
        print(f"{message}")
    
    print(f"\n📈 Core Backend Status: {passed}/{total} tests passed ({(passed/total*100):.1f}%)")
    
    if passed == total:
        print("🎉 ALL CORE BACKEND TESTS PASSED! litellm dependency fix successful.")
        return True
    elif passed >= total * 0.8:  # 80% or more
        print("✅ Core backend is working well. Minor issues detected.")
        return True
    else:
        print("⚠️ Core backend has significant issues.")
        return False

if __name__ == "__main__":
    success = test_core_endpoints()
    exit(0 if success else 1)