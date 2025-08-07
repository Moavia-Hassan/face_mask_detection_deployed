# Face Mask Detection System 😷

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688.svg)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.0+-FF6F00.svg)
![OpenCV](https://img.shields.io/badge/OpenCV-Latest-5C3EE8.svg)

A real-time face mask detection system built with FastAPI and TensorFlow. This AI-powered application can detect whether a person is wearing a face mask or not from images with high accuracy.

## 🚀 Features

- **Real-time Detection**: Instant analysis of uploaded images
- **High Accuracy**: Trained on thousands of images for reliable results
- **User-friendly Interface**: Modern, responsive web interface
- **Drag & Drop**: Easy image upload with preview
- **Confidence Score**: Get accuracy percentage for each prediction
- **Mobile Responsive**: Works seamlessly on all devices

## 🛠️ Technologies Used

- **Backend**: FastAPI, Python
- **AI/ML**: TensorFlow, OpenCV
- **Frontend**: HTML5, CSS3, JavaScript
- **UI Framework**: Custom responsive design
- **Model**: Deep Learning CNN architecture

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd face_mask_local
   ```

2. **Create and activate virtual environment**
   ```bash
   conda create -n face_mask python=3.8
   conda activate face_mask
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python main.py
   ```

5. **Access the application**
   - Open your browser and go to: `http://127.0.0.1:8000`

## 📁 Project Structure

```
face_mask_local/
├── main.py              # FastAPI application main file
├── model/
│   └── face_mask_model.h5  # Trained model
├── static/
│   ├── styles.css      # CSS styles
│   └── script.js       # JavaScript code
├── templates/
│   └── index.html      # HTML template
└── requirements.txt     # Project dependencies
```

## 🎯 How to Use

1. Open the application in your web browser
2. Upload an image by dragging and dropping or clicking the upload button
3. Preview your image before analysis
4. Click "Analyze Image" to get the prediction
5. View results with confidence score

## 🤖 Model Details

- **Architecture**: Convolutional Neural Network (CNN)
- **Input Size**: 128x128 pixels
- **Output**: Binary classification (Mask/No Mask)
- **Training Data**: Thousands of face images with and without masks
- **Accuracy**: High confidence in predictions

## 🌟 Features in Detail

- **Image Preview**: Preview images before analysis
- **Drag & Drop Interface**: Easy file uploading
- **Real-time Analysis**: Quick results
- **Confidence Scores**: Accuracy percentage for predictions
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Graceful error management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For any queries or suggestions, please reach out to [Your Email/Contact Information]

## 🙏 Acknowledgments

- Special thanks to Arch Technologies for the internship opportunity
- Thanks to the open-source community for various tools and libraries
- Image dataset contributors

---
Created with ❤️ by MOAVIA HASSAN
