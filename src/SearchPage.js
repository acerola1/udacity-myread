import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksApi from './BooksAPI';
import Book from './Book';

class SearchPage extends Component {
  state = {
    query: "",
    booksFound: []
  }

  setQuery(query) {
    this.setState({query});
    Promise.resolve().then(() => {
      if (query.trim()) {
        return BooksApi.search(query.trim(), 20);
      } else {
        return Promise.reject("Empty query");
      }
    }).then( booksFound => {
      if (!booksFound) {
        return Promise.reject("Undefined data");
      }
      if (booksFound.error) {
        return Promise.reject(booksFound.error);
      }
      this.setState({booksFound})
    }).catch((e) => {
      this.setState({booksFound: []})
      //console.log("error", e);
    });
  }

  getBookWithShelf(book) {
    const shelf = this.props.shelfByBookId.get(book.id);
    book.shelf = shelf || "none";
    return book;
  }

  render() {
    const {booksFound = []} = this.state;
    const booksWithShelf = booksFound.map(book => this.getBookWithShelf(book))
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={e => this.setQuery(e.target.value)}
              value={this.state.query}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {booksWithShelf.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBook={this.props.onUpdateBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
