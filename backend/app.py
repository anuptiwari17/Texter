from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(title="Texter")

# Get the absolute path of the frontend folder
frontend_path = os.path.abspath("../frontend")  # Adjust this path if needed

# Serve static files (CSS, JS, images, etc.)
app.mount("/static", StaticFiles(directory=os.path.join(frontend_path, "assets")), name="static")

# Serve index.html when visiting "/"
@app.get("/")
async def serve_frontend():
    return FileResponse(os.path.join(frontend_path, "index.html"))


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this to specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# API URL & Key
API_KEY = "AIzaSyC_WQRG1JmV42vlZfA04gRb3IGj3KgpZqI"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

class Query(BaseModel):
    q: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI & Automation Tool API"}

@app.post("/sentiment")
def give_sentiment(query: Query):
    if not query.q.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    return call_ai_model("You are a sentiment analyzer. Analyze the sentiment of this text in less than 30 words.", query.q)

@app.post("/refiner")
def refine(query: Query):
    if not query.q.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    return call_ai_model("You are a text refiner. Fix grammar, spelling, and paraphrase the text.", query.q)

@app.post("/summarizer")
def summariser(query: Query):
    if not query.q.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    return call_ai_model("You are a text summarizer. Summarize the given text in under 100 words.", query.q)

# Function to interact with AI model
def call_ai_model(instruction: str, text: str):
    data = {
        "contents": [{
            "parts": [{"text": f"{instruction} The text is: {text}"}]
        }]
    }
    headers = {"Content-Type": "application/json"}
    
    try:
        response = requests.post(URL, headers=headers, json=data, timeout=10)
        response.raise_for_status()  # Check for HTTP errors
        result = response.json()
        
        # Extract response text correctly
        if "candidates" in result:
            return {"response": result["candidates"][0]["content"]["parts"][0]["text"]}
        else:
            return {"error": "Unexpected API response", "details": result}
    
    except requests.RequestException as e:
        return {"error": f"API request failed: {str(e)}"}

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
