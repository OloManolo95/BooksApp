// make refernce to template .books-list
const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

// make reference to .books-list container

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
//add function initActions
const initActions = function(){

  //add dbclick event listener to bookList
  bookList.addEventListener('dblclick', function(event){

    //remove default browser behavior
    event.preventDefault();
    //add reference to clicked element parent
    const clickedElement = event.target.offsetParent;

    //check if clickedElement is a book element
    if (clickedElement.classList.contains('book__image')) {
      console.log('element clicked');
      //get book data-id attribute value
      const bookId = clickedElement.getAttribute('data-id');
      console.log(bookId);
      //add/remove 'favorite' class
      clickedElement.classList.toggle('favorite');
      //add book to a favoriteBooks array
      if(clickedElement.classList.contains('favorite')){
        favoriteBooks.push(bookId);}
      //remove book from a favorite array
      if(!clickedElement.classList.contains('favorite')){
        favoriteBooks.pop(bookId);
      }
      console.log('favorite books: ', favoriteBooks);

    }
  });

};

// run initActions

initActions();