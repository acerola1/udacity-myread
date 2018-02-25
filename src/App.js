import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchPage from './SearchPage';
import { Route, Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const bookShelves = [
  { value: 'currentlyReading', text: 'Currently Reading', disabled: false },
  { value: 'wantToRead', text: 'Want to Read', disabled: false },
  { value: 'read', text: 'Read', disabled: false }
];

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then( (books) => {
      console.log(books);
      this.setState({
        books
      });
    });
  }

  getBooksByShelf(shelf){
    return this.state.books.filter((book) => book.shelf === shelf);
  }

  render() {

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchPage/>
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {bookShelves.map((shelf) => (
                <BookShelf
                key={shelf.value}
                title={shelf.text}
                books={this.getBooksByShelf(shelf.value)}
              />

                ))}

              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
