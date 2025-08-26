/* ===== perfil popup ===== */
const emailToggle = document.getElementById("email-toggle");
const menuPopup   = document.getElementById("menu-popup");

emailToggle.addEventListener("click", () => {
  menuPopup.classList.toggle("hidden");
});

// fecha popup ao clicar fora
document.addEventListener("click", (e) => {
  if (!emailToggle.contains(e.target) && !menuPopup.contains(e.target)) {
    menuPopup.classList.add("hidden");
  }
});

/* ===== abrir modais ===== */
document.querySelector('.menu-item:nth-child(1)').addEventListener('click', () => abrirModal('configModal'));
document.querySelector('.menu-item:nth-child(2)').addEventListener('click', () => abrirModal('ajudaModal'));
document.querySelector('.menu-item:nth-child(3)').addEventListener('click', () => { window.location.href = 'index.html'; });

function abrirModal(id)  { document.getElementById(id).style.display = 'block'; }
function fecharModal(id) { document.getElementById(id).style.display = 'none'; }

window.onclick = function (event) {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target === modal) modal.style.display = 'none';
  });
};
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
});

/* ===== acordeão ===== */
const accordionButtons = document.querySelectorAll('.accordion-btn');
accordionButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const isOpen  = btn.classList.contains('active');

    accordionButtons.forEach((b) => {
      b.classList.remove('active');
      const c = b.nextElementSibling;
      if (c) c.style.maxHeight = null;
    });

    if (!isOpen) {
      btn.classList.add('active');
      if (content) content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

/* ===== carregamento das páginas dentro do #conteudo ===== */
function carregarPagina(pagina) {
  fetch(pagina, { cache: 'no-cache' })
    .then(res => {
      if (!res.ok) throw new Error(`Página não encontrada: ${pagina}`);
      return res.text();
    })
    .then(html => {
      const conteudo = document.getElementById('conteudo');
      conteudo.innerHTML = html;
      conteudo.scrollTop = 0;

      // marca link ativo (opcional)
      document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
      const linkAtivo = Array.from(document.querySelectorAll('.sidebar a'))
        .find(a => (a.getAttribute('onclick') || '').includes(pagina));
      if (linkAtivo) linkAtivo.classList.add('active');

      // dispara um evento global para quem precisar inicializar lógica da página injetada
      document.dispatchEvent(new CustomEvent('paginaCarregada', { detail: { pagina } }));

      // atalho: se for curriculo, chama inicializador se existir
      if (pagina.includes('curriculo') && typeof window.initCurriculo === 'function') {
        window.initCurriculo();
      }
    })
    .catch(err => {
      document.getElementById('conteudo').innerHTML = "<p>Erro ao carregar conteúdo.</p>";
      console.error(err);
    });
}

/* ===== favicon e tema (com checagem do botão opcional) ===== */
function setFavicon(theme) {
  const favicon = document.getElementById("favicon");
  const newIcon = theme === "dark" ? "../img/favicon-light.png" : "../img/favicon-dark.png";

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <filter id="fade"><feComponentTransfer><feFuncA type="linear" slope="0" /></feComponentTransfer></filter>
      <image filter="url(#fade)" href="${newIcon}" width="64" height="64"/>
    </svg>`;
  const svgBlob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);
  favicon.href = url;

  let opacity = 0;
  const interval = setInterval(() => {
    opacity += 0.1;
    if (opacity >= 1) {
      clearInterval(interval);
      favicon.href = newIcon;
      URL.revokeObjectURL(url);
    } else {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
          <filter id="fade"><feComponentTransfer><feFuncA type="linear" slope="${opacity}" /></feComponentTransfer></filter>
          <image filter="url(#fade)" href="${newIcon}" width="64" height="64"/>
        </svg>`;
      const svgBlob = new Blob([svg], { type: "image/svg+xml" });
      favicon.href = URL.createObjectURL(svgBlob);
    }
  }, 40);
}

function aplicarTemaInicial() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode");
    setFavicon("dark");
  } else {
    document.body.classList.remove("dark-mode");
    setFavicon("light");
  }
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (e.matches) {
    document.body.classList.add("dark-mode");
    setFavicon("dark");
  } else {
    document.body.classList.remove("dark-mode");
    setFavicon("light");
  }
});

// só adiciona listener se o botão existir
const botaoTema = document.getElementById("toggle-tema");
if (botaoTema) {
  botaoTema.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      setFavicon("light");
    } else {
      document.body.classList.add("dark-mode");
      setFavicon("dark");
    }
  });
}

aplicarTemaInicial();

// opcional: já carrega a página inicial ao abrir o painel
document.addEventListener('DOMContentLoaded', () => {
  carregarPagina('inicio.html');
});