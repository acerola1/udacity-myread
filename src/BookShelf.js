import React, { Component } from 'react';
import Book from './Book';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol>
          <TransitionGroup className='books-grid'>
            {this.props.books.map((book) => (
              <Fade key={book.id}>
              <li>
                <Book
                  book={book}
                  onUpdateBook={this.props.onUpdateBook}
                />
              </li>
              </Fade>
            ))}
            </TransitionGroup>
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
