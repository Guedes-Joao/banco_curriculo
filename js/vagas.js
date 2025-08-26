const vagas = [
    {
      titulo: "Estagiário Administrativo",
      empresa: "Empresa ABC",
      curso: "Administração",
      local: "Votuporanga",
      descricao: "Auxiliar nas rotinas administrativas, atendimento ao público e organização de documentos."
    },
    {
      titulo: "Estágio em Suporte Técnico",
      empresa: "Tech Solutions",
      curso: "Informática",
      local: "Home Office",
      descricao: "Atendimento remoto a usuários, manutenção de sistemas e redes."
    },
    {
      titulo: "Desenvolvedor Júnior",
      empresa: "SoftCode",
      curso: "Desenvolvimento de Sistemas",
      local: "Votuporanga",
      descricao: "Apoio em projetos web, codificação, testes e documentação técnica."
    },
    {
      titulo: "Auxiliar Agropecuário",
      empresa: "Fazenda Verde",
      curso: "Agropecuária",
      local: "Zona Rural",
      descricao: "Suporte nas atividades diárias da fazenda, manejo animal e controle de produção."
    }
  ];
  
  function renderizarVagas(filtrarPor = "todas") {
    const container = document.getElementById("listaVagas");
    container.innerHTML = "";
  
    const vagasFiltradas = vagas.filter(vaga => filtrarPor === "todas" || vaga.curso === filtrarPor);
  
    if (vagasFiltradas.length === 0) {
      container.innerHTML = "<p>Nenhuma vaga encontrada para esse curso.</p>";
      return;
    }
  
    vagasFiltradas.forEach(vaga => {
      const card = document.createElement("div");
      card.className = "vaga-card";
      card.innerHTML = `
        <h3>${vaga.titulo}</h3>
        <p><strong>Empresa:</strong> ${vaga.empresa}</p>
        <p><strong>Curso:</strong> ${vaga.curso}</p>
        <p><strong>Local:</strong> ${vaga.local}</p>
        <p>${vaga.descricao}</p>
        <button onclick="mostrarInteresse('${vaga.titulo}', '${vaga.empresa}')">Tenho Interesse</button>
      `;
      container.appendChild(card);
    });
  }
  
  function filtrarVagas() {
    const curso = document.getElementById("filtroCurso").value;
    renderizarVagas(curso);
  }
  
  function mostrarInteresse(titulo, empresa) {
    alert(`Seu interesse na vaga "${titulo}" da empresa "${empresa}" foi registrado!`);
  }
  
  window.onload = () => renderizarVagas();
  