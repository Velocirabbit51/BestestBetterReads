import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard.jsx';
import '../styles/bookcard.scss';

function BookContainer(props) {
  const bookinfo = props.bookinfo;
  
  const cards = [];
  if (bookinfo) {
    for (let i = 0; i < bookinfo.length; i++) {
      cards.push(<BookCard key={bookinfo.rating_id} bookinfo={bookinfo[i]} />);
    }
  }

  return (
    <div id="bookcontainer" className="container border-primary shadow" >
      {cards}
    </div>
   )
}

export default BookContainer;