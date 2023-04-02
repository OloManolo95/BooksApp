class BooksList {
  constructor(){
    const thisBooksList = this;

    thisBooksList.filters = [];
    thisBooksList.favoriteBooks = [];

    thisBooksList.initData();
    thisBooksList.getElements();
    thisBooksList.render();
    thisBooksList.initActions();
  }

  initData(){
    this.data = dataSource.books;
  }

  getElements(){

    const thisBooksList = this;

    thisBooksList.dom = {};

    thisBooksList.dom.bookList = document.querySelector('.books-list');
    thisBooksList.dom.filtersContainer = document.querySelector('.filters');
    thisBooksList.dom.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  }

  initActions(){

    const thisBooksList = this;

    //add dbclick event listener to bookList
    thisBooksList.dom.bookList.addEventListener('dblclick', function(event){
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
          thisBooksList.favoriteBooks.push(bookId);
        } else {
          //remove book from a favorite array
          const indexOfBook = thisBooksList.favoriteBooks.indexOf(bookId);
          thisBooksList.favoriteBooks.splice(indexOfBook, 1);
        }
        console.log('favorite books: ', thisBooksList.favoriteBooks);
      }
    });

    thisBooksList.dom.filtersContainer.addEventListener('click', function(event) {
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
          thisBooksList.filters.push(clickedElement.value);
          thisBooksList.filterBooks();
        } else {
          //if not, remove it from an array
          const indexOfFilter = thisBooksList.filters.indexOf(clickedElement.value);
          thisBooksList.filters.splice(indexOfFilter, 1);
          thisBooksList.filterBooks();
        }
        console.log(thisBooksList.filters);
      }
    });

  }

  //add function filterBooks
  filterBooks(){

    const thisBooksList = this;

    //iterate thru books in dataSource.books
    for(const book of dataSource.books){
      //make var shouldBeHidden
      let shouldBeHidden = false;
      //iterate thru filters array
      for(const filter of thisBooksList.filters){
        //check if filter matches book details property
        if(!book.details[filter]){
          shouldBeHidden = true;
          //
          break;
        }
      }
      //add refernece to all books
      const bookImages = thisBooksList.dom.bookList.querySelectorAll('.book__image');
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
  }

  // add function render

  render(){

    const thisBooksList = this;
    //make a loop
    for(const book of dataSource.books){

      //add const ratingBgc
      const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
      //add const ratingWidth which converts rating to percantage
      const ratingWidth = book.rating * 10;

      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;
      //generate a HTML code based on template and data of a book
      const generatedHTML = thisBooksList.dom.template(book);
      //create a DOM based on HTML
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      // add DOM to a bookList
      thisBooksList.dom.bookList.appendChild(generatedDOM);

    }
  }

  //add function determineRatingBgc

  determineRatingBgc(rating){


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
  }

}

const app = new BooksList();
console.log(app);
