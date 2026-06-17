let jogador;
let sementes = [];
let poluicoes = [];
let pontos = 0;
let estado = "jogando";

function setup() {
  createCanvas(800, 500);

  jogador = {
    x: width / 2,
    y: height - 60,
    tamanho: 40
  };

  for (let i = 0; i < 8; i++) {
    sementes.push(criarSemente());
  }

  for (let i = 0; i < 5; i++) {
    poluicoes.push(criarPoluicao());
  }
}

function draw() {
  desenharCenario();

  if (estado === "jogando") {
    moverJogador();
    desenharJogador();

    // Sementes
    for (let s of sementes) {
      fill(255, 215, 0);
      ellipse(s.x, s.y, 20);

      s.y += s.vel;

      if (s.y > height) {
        s.y = random(-100, -20);
        s.x = random(width);
      }

      if (dist(jogador.x, jogador.y, s.x, s.y) < 30) {
        pontos++;
        s.y = random(-100, -20);
        s.x = random(width);
      }
    }

    // Poluição
    for (let p of poluicoes) {
      fill(100);
      rect(p.x, p.y, 25, 25);

      p.y += p.vel;

      if (p.y > height) {
        p.y = random(-200, -20);
        p.x = random(width);
      }

      if (dist(jogador.x, jogador.y, p.x, p.y) < 30) {
        estado = "fim";
      }
    }

    fill(0);
    textSize(24);
    text("Sustentabilidade: " + pontos, 20, 35);

    // Vitória
    if (pontos >= 20) {
      estado = "vitoria";
    }
  }

  if (estado === "fim") {
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(40);
    text("Você poluiu a fazenda!", width / 2, height / 2);
    textSize(20);
    text("Pressione R para reiniciar", width / 2, height / 2 + 40);
  }

  if (estado === "vitoria") {
    fill(0, 150, 0);
    textAlign(CENTER);
    textSize(40);
    text("Agro Forte Sustentável!", width / 2, height / 2);
    textSize(20);
    text("Sua fazenda é exemplo de sustentabilidade!", width / 2, height / 2 + 40);
  }
}

function desenharCenario() {
  background(135, 206, 235);

  // Sol
  fill(255, 204, 0);
  ellipse(700, 80, 80);

  // Campo
  fill(80, 180, 80);
  rect(0, 350, width, 150);

  // Árvores
  for (let x = 80; x < width; x += 150) {
    fill(120, 70, 20);
    rect(x, 280, 20, 70);

    fill(30, 140, 30);
    ellipse(x + 10, 260, 60);
  }
}

function desenharJogador() {
  fill(50, 100, 255);
  ellipse(jogador.x, jogador.y, jogador.tamanho);

  fill(255);
  textAlign(CENTER);
  textSize(12);
  text("🚜", jogador.x, jogador.y + 5);
}

function moverJogador() {
  if (keyIsDown(LEFT_ARROW)) {
    jogador.x -= 6;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    jogador.x += 6;
  }

  jogador.x = constrain(jogador.x, 20, width - 20);
}

function criarSemente() {
  return {
    x: random(width),
    y: random(-500, 0),
    vel: random(2, 4)
  };
}

function criarPoluicao() {
  return {
    x: random(width),
    y: random(-500, 0),
    vel: random(3, 5)
  };
}

function keyPressed() {
  if (key === "r" || key === "R") {
    pontos = 0;
    estado = "jogando";

    for (let s of sementes) {
      s.x = random(width);
      s.y = random(-500, 0);
    }

    for (let p of poluicoes) {
      p.x = random(width);
      p.y = random(-500, 0);
    }
  }
}
