import React, { Component } from 'react';

class BookshelfChanger extends Component {
  options = [
    { value: 'null', text: 'Move to...', disabled: true },
    { value: 'currentlyReading', text: 'Currently Reading', disabled: false },
    { value: 'wantToRead', text: 'Want to Read', disabled: false },
    { value: 'read', text: 'Read', disabled: false },
    { value: 'none', text: 'None', disabled: false }
  ];

  render() {
    const {bookShelf} = this.props;
    return (
      <div className="book-shelf-changer">
        <select defaultValue={bookShelf}>
          {this.options.map(o =>
            <option
              key={o.value}
              disabled={o.disabled}
              value={o.value}>
              {o.text}
            </option>
          )}
        </select>
      </div>
    );
  }
}

export default BookshelfChanger;
