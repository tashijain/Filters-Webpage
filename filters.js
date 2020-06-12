let basicimg = null;
let redimg = null;
let rgbimg = null;
let grayimg = null;
let clrimg = null;
let rnbowimg = null;
let blurimg = null;
let invertimg = null;
let warmimg = null;
let ctmimg = null;
let miximg = null;
let c1;
function loadImage() {
  let d1 = document.getElementById("filebtn");
  basicimg = new SimpleImage(d1);
  redimg = new SimpleImage(d1);
  rgbimg = new SimpleImage(d1);
  grayimg = new SimpleImage(d1);
  clrimg = new SimpleImage(d1);
  rnbowimg = new SimpleImage(d1);
  blurimg = new SimpleImage(d1);
  invertimg = new SimpleImage(d1);
  warmimg = new SimpleImage(d1);
  ctmimg = new SimpleImage(d1);
  miximg = new SimpleImage(d1);
  c1 = document.getElementById("can");
  basicimg.drawTo(c1);
}

function imageLoaded(img) {
  if (img == null || !img.complete()) {
    alert("Image not loaded. Please load image first to proceed.");
    return false;
  } else {
    return true;
  }
}

function redFilter() {
  if (imageLoaded(redimg)) {
    for (var pixel of redimg.values()) {
      let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    }
    redimg.drawTo(c1);
  }
}

function rgbFilter() {
  if (imageLoaded(rgbimg)) {
    let w = rgbimg.getWidth();
    let w1 = w / 3;
    let w3 = 2 * w1;
    for (var pixel of rgbimg.values()) {
      var x = pixel.getX();
      if (x < w1) {
        pixel.setRed(255);
      } else if (x > w3) {
        pixel.setBlue(255);
      } else {
        pixel.setGreen(220);
      }
    }
    rgbimg.drawTo(c1);
  }
}

function grayFilter() {
  if (imageLoaded(grayimg)) {
    for (var pixel of grayimg.values()) {
      let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      pixel.setRed(avg);
      pixel.setBlue(avg);
      pixel.setGreen(avg);
    }
    grayimg.drawTo(c1);
  }
}

function colorFilter() {
  if (imageLoaded(clrimg)) {
    let clrval = document.getElementById("clrbtn");
    let val = clrval.value;
    val = val.replace("#", "");
    let arrRGB = [];
    // 3 digit hex code, 4 includes #
    if (val.length == 3) {
      arrRGB[0] = parseInt(val.substring(0, 1) + val.substring(0, 1), 16);
      arrRGB[1] = parseInt(val.substring(1, 2) + val.substring(1, 2), 16);
      arrRGB[2] = parseInt(val.substring(2, 3) + val.substring(2, 3), 16);
    } else if (val.length == 6) {
      // 6 digit hex code, 7 includes #
      arrRGB[0] = parseInt(val.substring(0, 2), 16);
      arrRGB[1] = parseInt(val.substring(2, 4), 16);
      arrRGB[2] = parseInt(val.substring(4, 6), 16);
    } else {
      // if wrong hex code
      alert("Not a valid color hex code");
    }
    let r = arrRGB[0];
    let g = arrRGB[1];
    let b = arrRGB[2];
    for (var pixel of clrimg.values()) {
      let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      if (avg < 128) {
        pixel.setRed(r / 127.5 * avg);
        pixel.setGreen(g / 127.5 * avg);
        pixel.setBlue(b / 127.5 * avg);
      } else {
        pixel.setRed((2 - r / 127.5) * avg + 2 * r - 255);
        pixel.setGreen((2 - g / 127.5) * avg + 2 * g - 255);
        pixel.setBlue((2 - b / 127.5) * avg + 2 * b - 255);
      }
    }
    clrimg.drawTo(c1);
  }
}

function rainbowFilter() {
  if (imageLoaded(rnbowimg)) {
    for (var pixel of rnbowimg.values()) {
      let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      var x = pixel.getX();
      var y = pixel.getY();
      var w1 = rnbowimg.getHeight() / 7;
      if (avg < 128) {
        if (y < w1) {
          pixel.setRed(2 * avg);
          pixel.setGreen(0);
          pixel.setBlue(0);
        } else if (y > w1 && y < 2 * w1) {
          pixel.setRed(2 * avg);
          pixel.setGreen(0.8 * avg);
          pixel.setBlue(0);
        } else if (y > 2 * w1 && y < 3 * w1) {
          pixel.setRed(2 * avg);
          pixel.setGreen(2 * avg);
          pixel.setBlue(0);
        } else if (y > 3 * w1 && y < 4 * w1) {
          pixel.setRed(0);
          pixel.setGreen(2 * avg);
          pixel.setBlue(0);
        } else if (y > 4 * w1 && y < 5 * w1) {
          pixel.setRed(0);
          pixel.setGreen(0);
          pixel.setBlue(2 * avg);
        } else if (y > 5 * w1 && y < 6 * w1) {
          pixel.setRed(0.8 * avg);
          pixel.setGreen(0);
          pixel.setBlue(2 * avg);
        } else {
          pixel.setRed(1.6 * avg);
          pixel.setGreen(0);
          pixel.setBlue(1.6 * avg);
        }
      } else {
        if (y < w1) {
          pixel.setRed(255);
          pixel.setGreen(2 * avg - 255);
          pixel.setBlue(2 * avg - 255);
        } else if (y > w1 && y < 2 * w1) {
          pixel.setRed(255);
          pixel.setGreen(1.2 * avg - 51);
          pixel.setBlue(2 * avg - 255);
        } else if (y > 2 * w1 && y < 3 * w1) {
          pixel.setRed(255);
          pixel.setGreen(255);
          pixel.setBlue(2 * avg - 255);
        } else if (y > 3 * w1 && y < 4 * w1) {
          pixel.setRed(2 * avg - 255);
          pixel.setGreen(255);
          pixel.setBlue(2 * avg - 255);
        } else if (y > 4 * w1 && y < 5 * w1) {
          pixel.setRed(2 * avg - 255);
          pixel.setGreen(2 * avg - 255);
          pixel.setBlue(255);
        } else if (y > 5 * w1 && y < 6 * w1) {
          pixel.setRed(1.2 * avg - 51);
          pixel.setGreen(2 * avg - 255);
          pixel.setBlue(255);
        } else {
          pixel.setRed(0.4 * avg + 153);
          pixel.setGreen(2 * avg - 255);
          pixel.setBlue(0.4 * avg + 153);
        }
      }
    }
    rnbowimg.drawTo(c1);
  }
}

function blurFilter() {
  if (imageLoaded(blurimg)) {
    let blkimg = new SimpleImage(blurimg.getWidth(), blurimg.getHeight());
    for (var pixel of blkimg.values()) {
      var x = pixel.getX();
      var y = pixel.getY();
      let rndm = Math.random();
      if (rndm < 0.5) {
        let samepxl = blurimg.getPixel(x, y);
        blkimg.setPixel(x, y, samepxl);
      } else {
        let rndmx = Math.floor(Math.random() * 10);
        let rndmy = Math.floor(Math.random() * 10);
        let newx = x+rndmx;
        let newy = y+rndmy;
        if (newx > blkimg.getWidth() - 1) {
          newx = blkimg.getWidth-1;
        }
        if (newx < 0) {
          newx = 0;
        }
        if (newy > blkimg.getHeight() - 1) {
          newy = blkimg.getHeight()-1;
        }
        if (newy < 0) {
          newy = 0;
        }
        let nearbypxl = blurimg.getPixel(newx, newy);
        blkimg.setPixel(x, y, nearbypxl);
      }
    }
    blkimg.drawTo(c1);
  }
}

function invertFilter(){
  if(imageLoaded(invertimg)){
    for(var pixel of invertimg.values()){
      pixel.setRed(255 - pixel.getRed());
      pixel.setGreen(255 - pixel.getGreen());
      pixel.setBlue(255 - pixel.getBlue());
    }
    invertimg.drawTo(c1);
  }
}

function warmFilter(){
  if(imageLoaded(warmimg)){
    for(var pixel of warmimg.values()){
      var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
      pixel.setRed(2*pixel.getRed() - avg);
      pixel.setGreen(2*pixel.getGreen() - avg);
      pixel.setBlue(2*pixel.getBlue() - avg);
    }
    warmimg.drawTo(c1);
  }
}

function customFilter(){
  if(imageLoaded(ctmimg)){
    for(var pixel of ctmimg.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      if((x+y)%5 == 0){
      pixel.setRed(pixel.getRed()/3);
      pixel.setGreen(pixel.getGreen()/3);
      pixel.setBlue(pixel.getBlue()/3);
      }
    }
    ctmimg.drawTo(c1);
  }
}

function resetImage() {
  if (imageLoaded(basicimg)) {
    basicimg.drawTo(c1);
  }
}
