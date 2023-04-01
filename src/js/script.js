// make refernce to template .books-list

const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

// make reference to .books-list container

const bookList = document.querySelector('.books-list');

//add reference to form .filters

const filtersContainer = document.querySelector('.filters');



//add empty array
const filters = [];

//add empty array
const favoriteBooks = [];



// add function render

const render = function(){
//make a loop
  for(const book of dataSource.books){

    //add const ratingBgc
    const ratingBgc = determineRatingBgc(book.rating);
    //add const ratingWidth which converts rating to percantage
    const ratingWidth = book.rating * 10;

    book.ratingBgc = ratingBgc;
    book.ratingWidth = ratingWidth;
    //generate a HTML code based on template and data of a book
    const generatedHTML = template(book);
    //create a DOM based on HTML
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    // add DOM to a bookList
    bookList.appendChild(generatedDOM);

  }
};


//add function filterBooks
const filterBooks = function(){
//iterate thru books in dataSource.books
  for(const book of dataSource.books){
  //make var shouldBeHidden
    let shouldBeHidden = false;
    //iterate thru filters array
    for(const filter of filters){
    //check if filter matches book details property
      if(!book.details[filter]){
        shouldBeHidden = true;
        //
        break;
      }
    }

    //add refernece to all books
    const bookImages = bookList.querySelectorAll('.book__image');
    //check if shouldBeHidden is true
    if(shouldBeHidden) {
      //iterate thru book images
      for(const image of bookImages){
        //find apropriate book image
        if (book.id == image.getAttribute('data-id')){
          //add 'hidden' class
          image.classList.add('hidden');
        }
      }
    } else {
      //iterate thru book images
      for(const image of bookImages){
      //find apropriate book image
        if (book.id == image.getAttribute('data-id')){
        //add 'hidden' class
          image.classList.remove('hidden');
        }
      }
    }
  }
};

//add function determineRatingBgc

const determineRatingBgc = function(rating){

  let background;

  if(rating < 6){
    background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  }
  if(rating > 6 && rating <= 8){
    background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  }
  if(rating > 8 && rating <=9){
    background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  }
  if(rating > 9){
    background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }

  return background;
};


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

        filterBooks();

      } else {
        //if not, remove it from an array
        const indexOfFilter = filters.indexOf(clickedElement.value);
        filters.splice(indexOfFilter, 1);

        filterBooks();
      }
      console.log(filters);
    }


  });

};

// run functions
render();
initActions();
