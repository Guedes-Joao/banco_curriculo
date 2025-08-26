const elements = document.querySelectorAll('.divulgacao, .info, .estagiando');

elements.forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('active');
  });
});
