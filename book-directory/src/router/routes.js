const routes = require('express').Router();
const Book = require('../models/Book');

routes.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books)
    } catch (error) {
        res.status(400).json({ message: `Erro ao listar os livros!! ${error}` })
    }
})

routes.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const oneBook = await Book.find({ _id: id });

        if (!oneBook) {
            res.status(400).json({ message: `Erro ao listar o livro!! ${error}` });
            return;
        }

        res.status(200).json(oneBook)
    } catch (error) {
        res.status(400).json({ message: `Erro ao listar o livro!! ${error}` })
    }
})


routes.post('/', async (req, res) => {
    const { nome, preco, descricao, autor } = req.body;

    if (!nome) res.status(422).json({ message: `Nome do livro deve ser preenchido!` })
    if (!preco) res.status(422).json({ message: `Preço do livro deve ser preenchido!` })
    if (!descricao) res.status(422).json({ message: `Descrição do livro deve ser preenchido!` })
    if (!autor) res.status(422).json({ message: `Autor do livro deve ser preenchido!` })

    const book = {
        nome, preco, descricao, autor
    }
    try {
        await Book.create(book);
        res.status(200).json({ message: `Livro cadastrado com sucesso!` })
    } catch (error) {
        res.status(400).json({ message: `Erro ao cadastrar livro no sistema` });
    }
});

routes.put('/:id', async (req, res) => {
    const id = req.params.id;
    const book = { nome, preco, descricao, autor } = req.body;

    try {
        const bookUpdate = await Book.updateOne({ _id: id }, book);
        if (bookUpdate.matchedCount == 0) {
            res.status(422).json({ message: `o livro não foi encontrado!` });
            return;
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(400).json({ message: `Erro ao atualizar livro no sistema` });
    }

})

routes.delete('/:id', async (req, res) => {
    const id = req.params.id
    const book = await Book.find({ _id: id });
    
    if (book == false) {
        res.status(422).json({ message: `o livro não foi encontrado!` });
        return;
    }

    try {
        await Book.deleteOne({ _id: id });
        res.status(200).json({ message: "Livro deletado com sucesso!" });

    } catch (error) {
        res.status(400).json({ message: `Erro ao deletar livro no sistema ${error}` });
    }
})

module.exports = routes;