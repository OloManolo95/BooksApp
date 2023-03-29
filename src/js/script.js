// make refernce to template .books-list
const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

// make reference to .books-list

const bookList = document.querySelector('.books-list');

// add function render

const render = function(){
//make a loop
  for(const book of dataSource.books){
    //generate a HTML code based on template and data of a book
    const generatedHTML = template(book);
    //create a DOM based on HTML
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    // add DOM to a bookList
    bookList.appendChild(generatedDOM);

  }
};

render();

//add empty array
const favoriteBooks = [];

//add references to books

const allBooks = document.querySelectorAll('.book__image');



const initActions = function(){
  for(const book of allBooks){

    //get id from data-id
    const bookId = book.getAttribute('data-id');
    console.log(bookId);

    //add dbclick event listener
    book.addEventListener('dblclick',function(event){
      event.preventDefault();

      book.classList.toggle('favorite');
      if(book.classList.contains('favorite')){
        favoriteBooks.push(bookId);}
      if(!book.classList.contains('favorite')){
        favoriteBooks.pop(bookId);
      }
      console.log('favorite books: ', favoriteBooks);
    });
  }
};


// run initActions

initActions();