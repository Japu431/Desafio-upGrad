const mongoose = require(`mongoose`)

const Book = mongoose.model('book', {
    nome: String,
    preco: Number,
    descricao: String,
    autor: String,
})


module.exports = Book;