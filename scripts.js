const video = document.querySelector('.player');
const image = document.querySelector('.image-display');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');

const videoStream = getVideo();
let canvasInterval;
video.addEventListener('canplay', () => {
  canvasInterval = paintToCanvas();
});

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
      return video;
    })
    .catch(err => console.error('Webcam Error!', err));
}

function stopVideo() {
  clearInterval(canvasInterval);
  videoStream.getTracks()[0].stop();
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  
  canvas.width = width;
  canvas.height = height;
  
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    
    let pixels = ctx.getImageData(0, 0, width, height);
    
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    
    /* GHOSTING EFFECT */
    // ctx.globalAlpha = 0.1;
    
    
    ctx.putImageData(pixels, 0, 0);
  }, 30);
}

function takePhoto() {
  const data = canvas.toDataURL('image/jpeg');
  image.src = data;
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    // pixels[i] = red
    // pixels[i+1] = green
    // pixels[i+2] = blue
    // pixels[i+3] = alpha
    
    pixels.data[i] = pixels.data[i] + 50;
    pixels.data[i+1] = pixels.data[i+1] - 50;
    pixels.data[i+2] = pixels.data[i+2] * 0.5;
  }
  
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    // pixels[i] = red
    // pixels[i+1] = green
    // pixels[i+2] = blue
    // pixels[i+3] = alpha
    
    pixels.data[i - 150] = pixels.data[i] + 50;
    pixels.data[i + 100] = pixels.data[i+1] - 50;
    pixels.data[i - 150] = pixels.data[i+2] * 0.5;
  }
  
  return pixels;
}

function chromaKey(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    // pixels[i] = red
    // pixels[i+1] = green
    // pixels[i+2] = blue
    // pixels[i+3] = alpha
    
    pixels.data[i - 150] = pixels.data[i] + 50;
    pixels.data[i + 100] = pixels.data[i+1] - 50;
    pixels.data[i - 150] = pixels.data[i+2] * 0.5;
  }
  
  return pixels;
}


