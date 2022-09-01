import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { useMediaQuery } from 'react-responsive';

export default function ShowBookList() {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const isMobile = useMediaQuery({ query: '(max-width: 900px)'})

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            setError(false)
            try {
                const response = await axios('http://localhost:8082/api/books')
                setBooks(response.data)
                setLoading(false)
            } catch(err) {
                setError(true)
                console.log(err)
            }
        }

        fetchData();
    }, [])


    return(
        <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">The Librarian</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-book" className="btn btn-outline-dark float-right">
                + Add New Book
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className={isMobile ? "mobile-list" : "list"}>
                {loading && !error ? <h1>Loading...</h1> : books.map((book, k) =>
        <BookCard book={book} key={k} />
      )}
          </div>
        </div>
      </div>
    )
}