const form = document.getElementById('form');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const inputs = form.querySelectorAll('input, select, textarea');

function updateProgress() {
  let filled = 0;
  let total = 0;

  inputs.forEach(input => {
    if (input.type !== "file") {
      total++;
      if ((input.type === "checkbox" && input.checked) || (input.value && input.value.trim() !== '')) {
        filled++;
      }
    }
  });

  const percent = total === 0 ? 0 : Math.round((filled / total) * 100);
  progressBar.style.width = percent + '%';
  progressText.textContent = percent + '%';
}

inputs.forEach(input => {
  input.addEventListener('input', updateProgress);
  input.addEventListener('change', updateProgress);
});