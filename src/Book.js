import React, { Component } from 'react';
import BookshelfChanger from './BookshelfChanger';

class Book extends Component {
  render() {
    let {title, authors = [], shelf, imageLinks} = this.props.book;
    return(
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: 'url(' + imageLinks.smallThumbnail + ')' }}>
          </div>
          <BookshelfChanger
            bookShelf={shelf}
            book={this.props.book}
            onUpdateBook={this.props.onUpdateBook}
          />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    );
  }
}

export default Book;
