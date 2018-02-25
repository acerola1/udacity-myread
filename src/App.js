import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';
import BookShelf from './BookShelf';
import AddBook from './AddBook';

export const bookShelves = [
  { value: 'currentlyReading', text: 'Currently Reading', disabled: false },
  { value: 'wantToRead', text: 'Want to Read', disabled: false },
  { value: 'read', text: 'Read', disabled: false }
];

class BooksApp extends React.Component {
/*   constructor(props, context) {
    super(props, context);
  } */

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({
        books
      });
    });
  }

  getBooksByShelf(shelf) {
    return this.state.books.filter((book) => book.shelf === shelf);
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(state => ({
        books: state.books.map(b => {
          if (b.id === book.id) b.shelf=shelf;
          return b;
        })
    }))});
  }

  render() {

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchPage />
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
                    onUpdateBook={this.updateBook}
                  />
                ))}
              </div>
            </div>
            <AddBook/>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
