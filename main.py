from fastapi import FastAPI, Request, UploadFile, File
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import uvicorn
import shutil
import numpy as np
import uuid
import os
import cv2
from tensorflow.keras.models import load_model
import requests
import io

from huggingface_hub import hf_hub_download
from tensorflow.keras.models import load_model

# Download model from Hugging Face Hub
model_path = hf_hub_download(repo_id="moavia112/face-mask-model", filename="face_mask_model.h5")

# Load the Keras model
model = load_model(model_path)

# Create app and link to templates folder
app = FastAPI()
templates = Jinja2Templates(directory="templates")

# Mount static directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Route: Home page
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Route: Predict
@app.post("/predict", response_class=HTMLResponse)
async def predict(request: Request, file: UploadFile = File(...)):
    # Generate a unique filename to avoid conflicts
    file_ext = os.path.splitext(file.filename)[-1]
    unique_filename = f"{uuid.uuid4().hex}{file_ext}"
    file_path = os.path.join("static", unique_filename)

    # Save the file to the 'static' directory
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Load and preprocess the image for prediction
    img = cv2.imread(file_path)
    img = cv2.resize(img, (128, 128))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    # Predict with the model
    prediction = model.predict(img)[0][0]
    label = "With Mask 😷" if prediction > 0.5 else "Without Mask ❌"
    confidence = round(prediction * 100 if prediction > 0.5 else (1 - prediction) * 100, 2)

    return templates.TemplateResponse("index.html", {
        "request": request,
        "prediction": label,
        "confidence": confidence,
        "image_url": f"/static/{unique_filename}",
        "filename": unique_filename
    })

# Run using `python main.py`
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
