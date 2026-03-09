
function selecaoMenu(secao){

  const secoes = document.querySelectorAll("section");

  secoes.forEach(function(s){
    s.classList.add("hidden");
  });

  document.getElementById(secao).classList.remove("hidden");

}

document.addEventListener("DOMContentLoaded", () => {
  let slideAtual = 0;

  const slides = document.getElementById("slides");
  const totalSlides = document.querySelectorAll("#slides > div").length;

  function mostrarSlide() {
    slides.style.transform = `translateX(-${slideAtual * 100}%)`;
  }

  document.getElementById("next").addEventListener("click", () => {
    slideAtual = (slideAtual + 1) % totalSlides;
    mostrarSlide();
  });

  document.getElementById("prev").addEventListener("click", () => {
    slideAtual = (slideAtual - 1 + totalSlides) % totalSlides;
    mostrarSlide();
  });
});