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

/*/add function filterBooks
const filterBooks = function(){
//iterate thru books in dataSource.books
  for(const book of dataSource.books){
  //make var shouldBeHidden
    let shouldBeHidden = false;
    //iterate thru filters array
    for(const filter of filters){
    //check if filter matches book
      if(!book.details[filter]){
        shouldBeHidden = true;
      }
    }
  }
};
/};*/
//add empty array
const filters = [];

//add reference to form .filters
const filtersContainer = document.querySelector('.filters');

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
        favoriteBooks.push(bookId);
      } else {
        //remove book from a favorite array
        const indexOfBook = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(indexOfBook, 1);
      }

      console.log('favorite books: ', favoriteBooks);

    }
  });


  //add new event listener on form

  filtersContainer.addEventListener('click', function(event){

    //add refernce to clicked element
    const clickedElement = event.target;

    //add reference to clicked element tagName, type, name
    const tagName = clickedElement.tagName;
    const type = clickedElement.getAttribute('type');
    const name = clickedElement.getAttribute('name');

    //check if element is a checkbox
    if(tagName == 'INPUT' && type == 'checkbox' && name == 'filter') {
      console.log(clickedElement.value);

      //check if input is checked
      if(clickedElement.checked){

        //if checked, add to an array
        filters.push(clickedElement.value);

      } else {
        //if not, remove it from an array
        const indexOfFilter = filters.indexOf(clickedElement.value);
        filters.splice(indexOfFilter, 1);

      }
      console.log(filters);
    }


  });

};

// run initActions

initActions();