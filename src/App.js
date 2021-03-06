import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchPage from './SearchPage';
import { Route, Switch } from 'react-router-dom';
import BookShelf from './BookShelf';
import AddBook from './AddBook';
import NotFound from './NotFound';

export const bookShelves = [
  { value: 'currentlyReading', text: 'Currently Reading', disabled: false },
  { value: 'wantToRead', text: 'Want to Read', disabled: false },
  { value: 'read', text: 'Read', disabled: false }
];

class BooksApp extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      });
    });
  }

  getBooksByShelf(shelf) {
    return this.state.books.filter((book) => book.shelf === shelf);
  }

  getShelfByBookId() {
    const shelfByBookId = new Map();
    for (let book of this.state.books) {
      shelfByBookId.set(book.id, book.shelf);
    }
    return shelfByBookId;
  }

  updateBook = (book, shelf) => {
    book.shelf = shelf;
    this.setState(state => ({
      books: state.books.filter(b => b.id != book.id).concat([book])
      })
    );
    BooksAPI.update(book, shelf);
  };

  render() {

    return (
      <div className="app">
        <Switch>
          <Route path="/search" render={() => (
            <SearchPage
              onUpdateBook={this.updateBook}
              shelfByBookId={this.getShelfByBookId()}
            />
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
              <AddBook />
            </div>
          )} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
