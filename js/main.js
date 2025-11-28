document.addEventListener('DOMContentLoaded', function(){

  // ----------------------------
  // Tema claro/oscuro
  // ----------------------------
  const themeBtn = document.getElementById('themeBtn');
  const body = document.body;

  function updateThemeButton(isLight) {
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    themeBtn.title = isLight ? 'Activado: modo claro' : 'Activado: modo oscuro';
  }

  let isLight = localStorage.getItem('animelab-theme') === 'light';
  body.classList.toggle('light', isLight);
  updateThemeButton(isLight);

  themeBtn.addEventListener('click', () => {
    const nowLight = body.classList.toggle('light');
    localStorage.setItem('animelab-theme', nowLight ? 'light' : 'dark');
    updateThemeButton(nowLight);
  });

  // ----------------------------
  // Menú responsivo
  // ----------------------------
  const navToggle = document.getElementById("navToggle");
  const navList = document.querySelector(".nav-list");

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    navToggle.classList.toggle("active");
    navList.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ----------------------------
  // Lightbox
  // ----------------------------
  window.openLightbox = function(src){
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = src;
    lightbox.style.display = 'flex';
    requestAnimationFrame(() => lightbox.classList.add('show'));
  };

  window.closeLightbox = function(e){
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (e.target.id === 'lightbox' || e.target.id === 'lightboxImg') {
      lightbox.classList.remove('show');
      setTimeout(() => { lightbox.style.display = 'none'; img.src=''; }, 300);
    }
  };

  // ----------------------------
  // Perfiles
  // ----------------------------
  window.showProfile = function(name){
    const bio = {
      'Vegeta': 'Vegeta — príncipe saiyajin. Habilidad: superar sus límites mediante un orgullo indomable.',
      'Faye': 'Faye — cazarrecompensas astuta. Habilidad: evasión táctica y alto instinto de supervivencia.',
      'Pain': 'Pain — líder de Akatsuki. Habilidad: control de los Seis Caminos y dominio absoluto del chakra.',
      'Thorfinn': 'Thorfinn — guerrero islandés. Habilidad: velocidad extrema y técnica de combate cuerpo a cuerpo.'
    };
    alert(bio[name] || 'Perfil no encontrado');
  };
  // ----------------------------
// Formulario contacto con validación visual
// ----------------------------
const form = document.getElementById('contactForm');

form.addEventListener('submit', function(ev){
  ev.preventDefault();

  // Obtener campos
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  // Limpiar mensajes previos
  [name, email, message].forEach(input => {
    input.classList.remove('input-error', 'input-valid');
    input.nextElementSibling.textContent = '';
  });

  let valid = true;

  // Validar nombre
  if(name.value.trim() === ''){
    valid = false;
    name.classList.add('input-error');
    name.nextElementSibling.textContent = 'El nombre es obligatorio';
  } else {
    name.classList.add('input-valid');
  }

  // Validar correo
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(email.value.trim() === ''){
    valid = false;
    email.classList.add('input-error');
    email.nextElementSibling.textContent = 'El correo es obligatorio';
  } else if(!emailPattern.test(email.value.trim())){
    valid = false;
    email.classList.add('input-error');
    email.nextElementSibling.textContent = 'Correo no válido';
  } else {
    email.classList.add('input-valid');
  }

  // Validar mensaje
  if(message.value.trim() === ''){
    valid = false;
    message.classList.add('input-error');
    message.nextElementSibling.textContent = 'El mensaje no puede estar vacío';
  } else {
    message.classList.add('input-valid');
  }

  // Si todo es válido
  if(valid){
    alert(`¡Gracias, ${name.value}! Tu mensaje ha sido recibido (simulado).`);
    form.reset();

    // Limpiar estilos
    [name, email, message].forEach(input => input.classList.remove('input-valid'));
  }
});


  // ----------------------------
  // Pista JS
  // ----------------------------
  const showHintBtn = document.getElementById('showHint');
  showHintBtn.addEventListener('click', function(){
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = 'Pista: Revisa css/style.css para encontrar variables y layout. Revisa js/main.js para ver eventos.';
    document.querySelector('.hero').appendChild(hint);
    setTimeout(()=> hint.remove(), 6000);
  });

  // ----------------------------
  // MODAL NOTICIAS
  // ----------------------------
  const newsModal = document.getElementById("newsModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const closeNewsModal = document.getElementById("closeNewsModal");

  document.querySelectorAll(".read-more").forEach(btn => {
    btn.addEventListener("click", () => {
      const titulo = btn.dataset.title;
      const texto = btn.dataset.content;
      modalTitle.textContent = titulo;
      modalContent.textContent = texto;
      newsModal.classList.add("active");
    });
  });

  closeNewsModal.addEventListener("click", () => newsModal.classList.remove("active"));
  window.addEventListener("click", e => { if(e.target === newsModal) newsModal.classList.remove("active"); });

});
// ----------------------------
// Pie de página dinámico: año actual
// ----------------------------
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;


// --------------------------------------
// Música con animación tipo latido
// --------------------------------------
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let musicPlaying = false;

musicBtn.addEventListener('click', () => {
  if (!musicPlaying) {
    music.play();
    musicPlaying = true;
    musicBtn.textContent = "🔊 Pausar música";

    // Activar animación
    musicBtn.classList.add("music-playing");
  } else {
    music.pause();
    musicPlaying = false;
    musicBtn.textContent = "🔈 Música";

    // Desactivar animación
    musicBtn.classList.remove("music-playing");
  }
});
// ---------------------------------------------
// SECCIÓN ACERCA DE / CRÉDITOS — DESPLIEGUE
// ---------------------------------------------
const aboutBtn = document.getElementById('aboutBtn');
const aboutSection = document.getElementById('aboutSection');

aboutBtn.addEventListener('click', () => {
  aboutSection.classList.toggle('show');

  // Cambiar texto del botón
  if (aboutSection.classList.contains('show')) {
    aboutBtn.textContent = "📄 Ocultar información";
  } else {
    aboutBtn.textContent = "📄 Acerca de AnimeLab";
  }
});


