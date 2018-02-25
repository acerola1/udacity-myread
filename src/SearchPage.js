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
    BooksApi.search(query, 20).then( booksFound => {
      this.setState({booksFound})
      console.log(booksFound);
    });
  }

  render() {
    const {booksFound = []} = this.state;
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
          {booksFound.map((book) => (
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
