import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useMediaQuery } from 'react-responsive';

export default function BookCard(props) {

    const isMobile = useMediaQuery({ query: '(max-width: 900px)'})
    const book  = props.book;

    const styles = {
        color: "black"
    }

    const imgStyles = {
        maxHeight: isMobile ? "" : "380px"
    }

    const cardStyles = {
        marginBottom: isMobile ? "1rem" : 0
    }

    return(
        <div style={cardStyles} className="card-container">
            <Link to={`/show-book/${book._id}`}>
                <img style={imgStyles} className='book-img' src={book.img} alt="" />
            </Link>
            <div className="desc">
                <h2>
                    <Link to={`/show-book/${book._id}`} style={styles}>
                        { book.title }
                    </Link>
                </h2>
                <h3>{book.author}</h3>
                <p>{book.description}</p>
            </div>
        </div>
    )
};