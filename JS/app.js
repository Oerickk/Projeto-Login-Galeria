const formLogin = document.getElementById("formLogin");
const campoUsuario = document.getElementById("usuario");
const campoSenha = document.getElementById("senha");
const mensagem = document.getElementById("mensagem");

const telaLogin = document.getElementById("telaLogin");
const telaGaleria = document.getElementById("telaGaleria");
const mensagemBoasVindas = document.getElementById("mensagemBoasVindas");
const btnSair = document.getElementById("btnSair");

const API = "https://jsonplaceholder.typicode.com/users";

formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();

    const usuarioDigitado = campoUsuario.value.trim();
    const senhaDigitada = campoSenha.value.trim();

    mensagem.textContent = "";
    mensagem.className = "";

    if (!usuarioDigitado || !senhaDigitada) {
        mensagem.textContent = "Preencha o usuário e a senha.";
        mensagem.className = "erro";
        return;
    }

    try {
        mensagem.textContent = "Verificando dados...";

        const resposta = await fetch(API);

        if (!resposta.ok) {
            throw new Error("Não foi possível consultar a API.");
        }

        const usuarios = await resposta.json();

        const usuarioEncontrado = usuarios.find(function (usuario) {
            return (
                usuario.username === usuarioDigitado &&
                usuario.email === senhaDigitada
            );
        });

        if (usuarioEncontrado) {
            mensagem.textContent = "Login realizado com sucesso!";
            mensagem.className = "sucesso";

            mensagemBoasVindas.textContent =
                `Bem-vindo, ${usuarioEncontrado.name}!`;

            telaLogin.hidden = true;
            telaGaleria.hidden = false;
        } else {
            mensagem.textContent =
                "Usuário ou senha incorretos. Tente novamente.";

            mensagem.className = "erro";
        }
    } catch (erro) {
        mensagem.textContent =
            "Erro ao conectar com a API. Tente novamente mais tarde.";

        mensagem.className = "erro";

        console.error(erro);
    }
});

btnSair.addEventListener("click", function () {
    telaGaleria.hidden = true;
    telaLogin.hidden = false;

    formLogin.reset();

    mensagem.textContent = "";
    mensagem.className = "";

    campoUsuario.focus();
});