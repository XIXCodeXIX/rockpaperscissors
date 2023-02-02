let model,
  video,
  keypoints,
  predictions = [];

function preload() {
  video = createCapture(VIDEO, () => {
    loadHandTrackingModel();
  });
  video.hide();

  p = loadImage("P.jpeg");
  s = loadImage("S.jpeg");
  r = loadImage("R.jpeg");
}

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent("canvasContainer");
  a = 0;
  a0 = 0;
  a1 = 0;
  a2 = 0;
  a3 = 0;
  r0 = 3
  s0 = 0
  o = random([1, 2, 3]);
  d = 0;
  sc = "";
  rx = 200
}

async function loadHandTrackingModel() {
  model = await handpose.load();
  select("#status").html("Hand Tracking Model Loaded");
  predictHand();
}

function draw() {
  background(255);
  textSize(25);
  text(sc, 200, 20);
    text(r0, rx, 200)
  s0 += 5
  if (s0% 300 == 0){
    r0 -= 1
  }
   if (r0 == 0){
    rx = 2000
      if (predictions.length > 0) {
    drawSkeleton();
  }
  }
}

async function predictHand() {
  predictions = await model.estimateHands(video.elt);

  setTimeout(() => predictHand(), 1);
}

function drawSkeleton() {
  let annotations = predictions[0].annotations;
  stroke(255, 0, 0);

  for (let j = 0; j < annotations.thumb.length - 1; j++) { 
    if (
      annotations.thumb[j + 1][0] < annotations.thumb[j + 1][1]
    ) {
      a3 = 1;
    } else {
      a3 = 0;
    }}

  for (let j = 0; j < annotations.indexFinger.length - 1; j++) {
    if (annotations.indexFinger[j + 1][0] < annotations.indexFinger[j + 1][1]) {
      a = 1;
    } else {
      a = 0;
    }
  }
  for (let j = 0; j < annotations.middleFinger.length - 1; j++) {
    if (
      annotations.middleFinger[j + 1][0] < annotations.middleFinger[j + 1][1]
    ) {
      a0 = 1;
    } else {
      a0 = 0;
    }
  }
  for (let j = 0; j < annotations.ringFinger.length - 1; j++) {
    if (annotations.ringFinger[j + 1][0] < annotations.ringFinger[j + 1][1]) {
      a1 = 1;
    } else {
      a1 = 0;
    }
  }
  for (let j = 0; j < annotations.pinky.length - 1; j++) {
    if (annotations.pinky[j + 1][0] < annotations.pinky[j + 1][1]) {
      a2 = 1;
    } else {
      a2 = 0;
    }
  }

  if (a2 == 1 && a1 == 1 && a0 == 0 && a == 0) {
    console.log("scissors");
    d = 1;
  }else if (a3 == 0 && a2 == 0 && a1 == 0 && a0 == 0 && a == 0)  {
    console.log("paper");
    d = 2;
  }  else if (a0 == 1 && a == 1){
    console.log("rock");
    d = 3;
  }

  if (o == 1) {
    image(s, 150, 150, 100, 100);
  } else if (o == 2) {
    image(p, 150, 150, 100, 100);
  } else if (o == 3) {
    image(r, 150, 150, 100, 100);
  }

  if (d == 1 && o == 1) {
    setTimeout(() => {
     noLoop();
    }, 1000);

    sc = "draw";
  } else if (d == 1 && o == 2) {
    setTimeout(() => {
     noLoop();
    }, 1000);
    sc = "you win";
  } else if (d == 1 && o == 3) {
    setTimeout(() => {
     noLoop();
    }, 1000);

    sc = "you loose";
  }

  if (d == 2 && o == 1) {
    setTimeout(() => {
     noLoop();
    }, 1000);

    sc = "you loose";
  } else if (d == 2 && o == 2) {
    setTimeout(() => {
    noLoop();
    }, 1000);

    sc = "draw";
  } else if (d == 2 && o == 3) {
    setTimeout(() => {
    noLoop();
    }, 1000);
    sc = "you win";
  }

  if (d == 3 && o == 1) {
    setTimeout(() => {
      noLoop();
    }, 1000);
    sc = "you win";
  } else if (d == 3 && o == 2) {
    setTimeout(() => {
     noLoop();
    }, 1000);

    sc = "you loose";
  } else if (d == 3 && o == 3) {
    setTimeout(() => {
     noLoop();
    }, 1000);

    sc = "draw";
  }
}
