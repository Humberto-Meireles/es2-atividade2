/**
 * Pega a referência dos elementos que serão utilizados
 * para a manipulação dos livros.
 */
const bookForm = document.querySelector('#bookForm');
const bookList = document.querySelector('#bookList');
const cleanBtn = document.querySelector('#cleanBtn');
const saveBtn = document.querySelector('#saveBtn');

/**
 * Recebe o nome do livro e cria um novo
 * item na lista de livros.
 */
const newBook = (livro) => {
  return `<li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${livro}</span>
    <i class="far fa-trash-alt delete">
  </li>`;
}

/**
 * Escuta ao detectar o evento de submissão do formulário,
 * adicionando o novo livro informado na lista.
 */
 bookForm.addEventListener('submit', (e) => {
  // Previne o comportamento padrão de submissão do formulário.
  e.preventDefault();

  // Pega o valor do input removendo os espaços em branco do início/fim da string.
  const book = bookForm.bookInput.value.trim();

  // Apenas adiciona o livro se o campo não estiver em branco.
  if (book.length > 0) {
    bookList.innerHTML += newBook(book);

    // Reseta o form para limpar o campo "Nome do livro"
    bookForm.reset();
  }
});

/**
 * Pergunta ao usuário se ele tem certeza da ação. Se confirmado,
 * remove o livro da lista.
 */
bookList.addEventListener('click', (e) => {
  if (confirm('Tem certeza que deseja excluir o livro?')) {

    // Verifica se existe a classe "delete" no elemento clicado.
    if (e.target.classList.contains('delete')) {

      // Remove o item pai (<li>) da lista.
      e.target.parentElement.remove();
    }
  }
});

/**
 * Ao clicar no botão salvar, verifica se existem livros
 * na lista. Se existir, 
 */
saveBtn.addEventListener('click', () => {
  // Se a lista estiver vazia não executa o salvamento da lista de livros.
  if (bookList.children.length == 0) {
    return;
  }

  let items = '';

  // Pega o nome de todos os livros fazendo a separação com o ";"
  for (let item of bookList.children) {
    items += item.innerText + ';';
  }

  // Remove o ";" do final da string de livros.
  localStorage.setItem('books', items.slice(0, -1));

  alert('Os livros foram salvos com sucesso.');
});

/**
 * Ao clicar no botão de limpar a lista remove
 * do localStorage o item "books" e limpa
 * a lista.
 */
cleanBtn.addEventListener('click', () => {
  if (confirm('Confirma a exclusão de todos os livros da lista?')) {
      // Se o usuário confirmar a limpeza, remove o item "books" do localStorage e limpa os itens lista.
    localStorage.removeItem('books');
    bookList.innerText = '';
  }

  setTimeout(() => alert('A lista de livros foi excluída com sucesso.'), 300);
});

/**
 * Executa após o carregamento da página, verificando se existem
 * livros salvos no localStorage. Se existir, popula a lista
 * com os livros armazenados.
 */
window.addEventListener('load', () => {
  // O item "books" existe no localStorage?
  if (localStorage.getItem('books')) {

    // Transforma a string de livros salva no localStorage em um array.
    const items = localStorage.getItem('books').split(';');

    // Adiciona cada um dos livros na listagem chamando a função "newBook".
    for (let item of items) {
      bookList.innerHTML += newBook(item);
    }
  }
});