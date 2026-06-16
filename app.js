const express = require('express');
const app = express();
const cors = require('cors'); 

const PORT = 3000;

app.use(cors()); 
app.use(express.json());

let livros = [
    { id: 1, titulo: "Cristiano Ronaldo: A Biografia", autor: "Guillem Balagué", ano: 2022, editora: "Santa Monica Studios"},
    { id: 2, titulo: "1984", autor: "George Orwell", ano: 1949, editora: "Santa Monica Studios"},
    { id: 3, titulo: "A Revolução dos Bichos", autor: "George Orwell", ano: 1945, editora: "Santa Monica Studios"},
    { id: 4, titulo: "A Culpa é das Estrelas", autor: "John Green", ano: 2012, editora: "Santa Monica Studios"},
    { id: 5, titulo: "Coraline", autor: "Neil Gaiman", ano: 2002, editora: "Santa Monica Studios"}
];

app.get('/livros', (req, res) => {
    return res.json(livros);
});

app.get('/livros/:id', (req, res) => {
    const idUrl = parseInt(req.params.id);
    const livro = livros.find(l => l.id === idUrl);

    if (livro) {
        return res.json(livro);
    } else {
        return res.status(404).json({ erro: "Livro não achado" });
    }
});

app.post('/livros', (req, res) => {
    const { titulo, autor, ano, editora } = req.body;

    const novoId = livros.length > 0 ? livros[livros.length - 1].id + 1 : 1;

    const novoLivro = {
        id: novoId,
        titulo,
        autor,
        ano,
        editora
    };

    livros.push(novoLivro);
    return res.status(201).json(novoLivro); 
});

app.put('/livros/:id', (req, res) => {
    const idUrl = parseInt(req.params.id);
    const livroIndex = livros.findIndex(l => l.id === idUrl);

    if (livroIndex === -1) {
        return res.status(404).json({ erro: "Livro não encontrado para atualização" });
    }

    const { titulo, autor, ano, editora } = req.body;

    livros[livroIndex] = {
        id: idUrl,
        titulo,
        autor,
        ano,
        editora
    };

    return res.json(livros[livroIndex]);
});

app.patch('/livros/:id', (req, res) => {
    const idUrl = parseInt(req.params.id);
    const livro = livros.find(l => l.id === idUrl);

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado para modificação" });
    }

    const { titulo, autor, ano, editora } = req.body;

    if (titulo !== undefined) livro.titulo = titulo;
    if (autor !== undefined) livro.autor = autor;
    if (ano !== undefined) livro.ano = ano;
    if (editora !== undefined) livro.editora = editora;

    return res.json(livro);
});

app.delete('/livros/:id', (req, res) => {
    const idUrl = parseInt(req.params.id);
    const livroIndex = livros.findIndex(l => l.id === idUrl);

    if (livroIndex === -1) {
        return res.status(404).json({ erro: "Livro não encontrado para exclusão" });
    }

    livros.splice(livroIndex, 1);

    return res.status(204).send(); 
});

app.listen(PORT, () => {
    console.log(`Servidor rodando ae na porta ${PORT}`);
});
