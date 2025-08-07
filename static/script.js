const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-upload');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const changeImageBtn = document.getElementById('change-image-btn');

// Handle drag and drop
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--primary-color)';
    dropZone.style.background = '#f8fafc';
});

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#cbd5e1';
    dropZone.style.background = 'transparent';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#cbd5e1';
    dropZone.style.background = 'transparent';
    
    if (e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];
        fileInput.files = e.dataTransfer.files;
        updateFileName(file.name);
        showImagePreview(file);
    }
});

// Handle file selection
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        updateFileName(file.name);
        showImagePreview(file);
    }
});

// Handle change image button
changeImageBtn.addEventListener('click', function() {
    resetUploadArea();
});

function showImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        uploadPlaceholder.style.display = 'none';
        imagePreviewContainer.style.display = 'block';
    }
    reader.readAsDataURL(file);
}

function resetUploadArea() {
    fileInput.value = '';
    uploadPlaceholder.style.display = 'block';
    imagePreviewContainer.style.display = 'none';
    imagePreview.src = '';
    document.getElementById('selected-file-name').textContent = '';
}

function updateFileName(name) {
    const fileNameElement = document.getElementById('selected-file-name');
    fileNameElement.textContent = name;
    fileNameElement.style.color = 'var(--text-secondary)';
}

// Handle form submission
document.getElementById('upload-form').addEventListener('submit', function() {
    document.querySelector('.loading').style.display = 'block';
});

// Webcam capture logic
const webcamBtn = document.getElementById('webcam-btn');
const webcamModal = document.getElementById('webcam-modal');
const webcamVideo = document.getElementById('webcam-video');
const webcamCanvas = document.getElementById('webcam-canvas');
const captureBtn = document.getElementById('capture-btn');
const closeWebcamBtn = document.getElementById('close-webcam-btn');
let webcamStream = null;

webcamBtn.addEventListener('click', async function() {
    webcamModal.style.display = 'flex';
    try {
        webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcamVideo.srcObject = webcamStream;
        webcamVideo.play();
    } catch (err) {
        alert('Could not access webcam. Please allow camera access.');
        webcamModal.style.display = 'none';
    }
});

closeWebcamBtn.addEventListener('click', function() {
    webcamModal.style.display = 'none';
    if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
        webcamStream = null;
    }
    webcamVideo.srcObject = null;
});

captureBtn.addEventListener('click', function() {
    webcamCanvas.width = webcamVideo.videoWidth;
    webcamCanvas.height = webcamVideo.videoHeight;
    webcamCanvas.getContext('2d').drawImage(webcamVideo, 0, 0);
    webcamCanvas.toBlob(function(blob) {
        // Create a file from the blob and set it as the file input
        const file = new File([blob], 'webcam_capture.png', { type: 'image/png' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
        updateFileName(file.name);
        showImagePreview(file);
        // Close modal and stop webcam
        webcamModal.style.display = 'none';
        if (webcamStream) {
            webcamStream.getTracks().forEach(track => track.stop());
            webcamStream = null;
        }
        webcamVideo.srcObject = null;
    }, 'image/png');
});
