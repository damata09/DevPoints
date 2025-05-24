// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const formDuvida = document.getElementById('form-duvida');
    const listaDuvidas = document.getElementById('lista-duvidas');
    const listaDesafios = document.getElementById('lista-desafios');
    const listaRanking = document.getElementById('lista-ranking');
    const infoPerfil = document.getElementById('info-perfil');

    let duvidas = [];
    let desafios = [];
    let ranking = [];
    let perfil = { pontos: 0 };

    // Função para carregar dúvidas
    function carregarDuvidas() {
        listaDuvidas.innerHTML = '';
        duvidas.forEach((duvida, index) => {
            const divDuvida = document.createElement('div');
            divDuvida.className = 'duvida';
            divDuvida.innerHTML = `
                <p>${duvida}</p>
                <button onclick="responderDuvida(${index})">Responder</button>
            `;
            listaDuvidas.appendChild(divDuvida);
        });
    }

    // Função para carregar desafios
    function carregarDesafios() {
        listaDesafios.innerHTML = '';
        desafios.forEach((desafio, index) => {
            const divDesafio = document.createElement('div');
            divDesafio.className = 'desafio';
            divDesafio.innerHTML = `
                <p>${desafio}</p>
                <button onclick="participarDesafio(${index})">Participar</button>
            `;
            listaDesafios.appendChild(divDesafio);
        });
    }

    // Função para carregar ranking
    function carregarRanking() {
        listaRanking.innerHTML = '';
        ranking.forEach((user, index) => {
            const divUser = document.createElement('div');
            divUser.className = 'user';
            divUser.innerHTML = `
                <p>${user.nome}: ${user.pontos} pontos</p>
            `;
            listaRanking.appendChild(divUser);
        });
    }

    // Função para carregar perfil
    function carregarPerfil() {
        infoPerfil.innerHTML = `
            <p>Pontos: ${perfil.pontos}</p>
            <button onclick="trocarPontos()">Trocar Pontos por Recompensas</button>
        `;
    }

    // Função para adicionar dúvida
    formDuvida.addEventListener('submit', function(event) {
        event.preventDefault();
        const novaDuvida = document.getElementById('nova-duvida').value;
        duvidas.push(novaDuvida);
        carregarDuvidas();
        formDuvida.reset();
    });

    // Função para responder dúvida
    window.responderDuvida = function(index) {
        alert(`Você respondeu a dúvida: ${duvidas[index]}`);
        perfil.pontos += 10;
        carregarPerfil();
    };

    // Função para participar de desafio
    window.participarDesafio = function(index) {
        alert(`Você participou do desafio: ${desafios[index]}`);
        perfil.pontos += 20;
        carregarPerfil();
    };

    // Função para trocar pontos por recompensas
    window.trocarPontos = function() {
        if (perfil.pontos >= 50) {
            perfil.pontos -= 50;
            alert('Você trocou 50 pontos por um curso!');
            carregarPerfil();
        } else {
            alert('Pontos insuficientes para trocar por recompensas.');
        }
    };

    // Exemplo de dados iniciais
    desafios = ['Desafio Semanal: Criar um CRUD', 'Desafio Mensal: Desenvolver um Jogo'];
    ranking = [
        { nome: 'João', pontos: 100 },
        { nome: 'Maria', pontos: 80 },
        { nome: 'Pedro', pontos: 60 }
    ];

    carregarDuvidas();
    carregarDesafios();
    carregarRanking();
    carregarPerfil();
// Função para enviar dados de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.text();
    alert(result);
});

// Função para enviar dados de registro
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.text();
    alert(result);
});
});