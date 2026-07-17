function makeFlower(){
  const wrap = document.createElement('div');
  wrap.className = 'flower';
  const size = 34 + Math.random()*40;
  wrap.style.width = size + 'px';
  wrap.style.height = size + 'px';
  wrap.style.left = Math.random()*100 + '%';
  wrap.style.top = Math.random()*100 + '%';
  wrap.style.animationDelay = (Math.random()*4) + 's';
  wrap.style.animationDuration = (5 + Math.random()*3) + 's';
  wrap.style.opacity = 0.55 + Math.random()*0.45;

  wrap.innerHTML = `
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <g>
        ${[0,45,90,135,180,225,270,315].map(a => `
          <ellipse cx="50" cy="26" rx="11" ry="20" fill="var(--petal)"
            transform="rotate(${a} 50 50)" />
        `).join('')}
        <circle cx="50" cy="50" r="13" fill="var(--center)"/>
      </g>
    </svg>
  `;
  return wrap;
}

const field = document.getElementById('flowerField');
for(let i=0;i<18;i++){
  field.appendChild(makeFlower());
}

const nameCard = document.getElementById('nameCard');
const welcomeScreen = document.getElementById('welcomeScreen');
const nameInput = document.getElementById('nameInput');
const welcomeName = document.getElementById('welcomeName');
const continueBtn = document.getElementById('continueBtn');
const empecemosBtn = document.getElementById('empecemosBtn');

const letterScreen = document.getElementById('letterScreen');
const letterText = document.getElementById('letterText');
const letterNextBtn = document.getElementById('letterNextBtn');

const letsGoScreen = document.getElementById('letsGoScreen');
const letsGoBtn = document.getElementById('letsGoBtn');
const proposalScreen = document.getElementById('proposalScreen');
const btnSi = document.getElementById('btnSi');
const btnNo = document.getElementById('btnNo');

const screenSi = document.getElementById('screenSi');
const screenNo = document.getElementById('screenNo');
const btnEndSi = document.getElementById('btnEndSi');
const btnEndNo = document.getElementById('btnEndNo');
const creditsScreen = document.getElementById('creditsScreen');
const creditProtagonist = document.getElementById('creditProtagonist');

const mensaje = `Hay personas que llegan y sin darse cuenta se vuelven el lugar al que uno quiere volver todos los días. Desde que estás en mi vida, todo tiene un color distinto, como si de repente hubiera más luz en las cosas pequeñas. Quiero que sepas lo importante que eres para mí, hoy y siempre.`;
function escribirCarta(){
  const palabras = mensaje.split(' ');
  letterText.innerHTML = '';
  palabras.forEach((palabra, i) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = palabra + ' ';
    span.style.animationDelay = (i * 0.12) + 's';
    letterText.appendChild(span);
  });

  const tiempoTotal = palabras.length * 120 + 500;
  setTimeout(() => {
    letterNextBtn.classList.add('show');
  }, tiempoTotal);
}

function mostrarCarta(){
  welcomeScreen.classList.remove('show');
  setTimeout(() => {
    welcomeScreen.style.display = 'none';
    letterScreen.classList.add('show');
    escribirCarta();
  }, 600);
}

function mostrarVamosAEllo(){
  letterScreen.classList.remove('show');
  setTimeout(() => {
    letterScreen.style.display = 'none';
    letsGoScreen.classList.add('show');
  }, 600);
}

function mostrarPropuesta(){
  letsGoScreen.classList.remove('show');
  setTimeout(() => {
    letsGoScreen.style.display = 'none';
    proposalScreen.classList.add('show');
  }, 600);
}

function goToWelcome(){
  const raw = nameInput.value.trim();
  const name = raw.length ? raw : 'Sugey';
  welcomeName.textContent = name;
  creditProtagonist.textContent = name; 
  nameCard.classList.add('fade-out');
  setTimeout(() => {
    nameCard.style.display = 'none';
    welcomeScreen.classList.add('show');
    setTimeout(() => {
      empecemosBtn.classList.add('show');
    }, 1000);
  }, 550);
}

function respuestaCorrectaSi(){
  proposalScreen.classList.remove('show');
  setTimeout(() => {
    proposalScreen.style.display = 'none';
    screenSi.classList.add('show');
    
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 }
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, 600);
}

function respuestaNo(){
  proposalScreen.classList.remove('show');
  setTimeout(() => {
    proposalScreen.style.display = 'none';
    screenNo.classList.add('show');
  }, 600);
}

function lanzarCreditos(){
  // Desvanecer pantallas de respuesta antes de eliminarlas
  screenSi.classList.remove('show');
  screenNo.classList.remove('show');
  
  setTimeout(() => {
    screenSi.style.display = 'none';
    screenNo.style.display = 'none';
    // Ocultar campo de flores de fondo para el negro de película
    document.getElementById('flowerField').style.display = 'none'; 
    creditsScreen.classList.add('show');
  }, 500);
}

continueBtn.addEventListener('click', goToWelcome);
nameInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') goToWelcome();
});
empecemosBtn.addEventListener('click', mostrarCarta);
letterNextBtn.addEventListener('click', mostrarVamosAEllo);
letsGoBtn.addEventListener('click', mostrarPropuesta);

btnSi.addEventListener('click', respuestaCorrectaSi);
btnNo.addEventListener('click', respuestaNo);
btnEndSi.addEventListener('click', lanzarCreditos);
btnEndNo.addEventListener('click', lanzarCreditos);