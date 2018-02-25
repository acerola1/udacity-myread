import React, { Component } from 'react';
import BookshelfChanger from './BookshelfChanger';

class Book extends Component {
  render() {
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+this.props.imageUrl+')' }}></div>
          <BookshelfChanger bookShelf={this.props.bookShelf}/>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors.join(', ')}</div>
      </div>
    );
  }
}

export default Book;
