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