const API_URL = 'https://eventos-backend-vfvv.onrender.com';

const form = document.getElementById('form-evento');
const lista = document.getElementById('lista-eventos');
const mensagem = document.getElementById('mensagem');

async function carregarEventos() {
  lista.textContent = 'Carregando...';
  try {
    const resposta = await fetch(`${API_URL}/eventos`);
    if (!resposta.ok) throw new Error();
    const eventos = await resposta.json();

    lista.innerHTML = '';
    eventos.forEach(e => {
      const div = document.createElement('div');
      div.className = 'evento';
      div.innerHTML = `
        <h3></h3>
        <p class="desc"></p>
        <p><strong>Data:</strong> <span class="data"></span></p>
        <p><strong>Local:</strong> <span class="local"></span></p>`;
      div.querySelector('h3').textContent = e.titulo;
      div.querySelector('.desc').textContent = e.descricao || '';
      div.querySelector('.data').textContent = e.data_evento;
      div.querySelector('.local').textContent = e.local;
      lista.appendChild(div);
    });
  } catch (erro) {
    lista.textContent = 'Erro ao carregar eventos.';
  }
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();

  const novoEvento = {
    titulo: document.getElementById('titulo').value,
    descricao: document.getElementById('descricao').value,
    data_evento: document.getElementById('data_evento').value,
    local: document.getElementById('local').value
  };

  try {
    const resposta = await fetch(`${API_URL}/eventos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoEvento)
    });

    if (!resposta.ok) throw new Error();
    mensagem.textContent = 'Evento cadastrado com sucesso!';
    form.reset();
    carregarEventos();
  } catch {
    mensagem.textContent = 'Erro ao cadastrar evento.';
  }
});

carregarEventos();