import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ShowBookDetails() {

    const {id} = useParams()
    const navigate = useNavigate()

    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            setError(false)
            try {
                const response = await axios(`http://localhost:8082/api/books/${id}`)
                setBook(prevState => ({...prevState, book: response.data}))
                setLoading(false)
            } catch(err) {
                console.log(err)
            }
        }

        fetchData()
    }, [id])

    const onDeleteClick = () => {
        axios
            .delete(`http://localhost:8082/api/books/${id}`)
            .then(res => {
                navigate("/")
            })
            .catch(err => {
                console.log("Error form ShowBookDetails_deleteClick");
            })
    }

    return(
        <div className="ShowBookDetails">
            { loading? <h2>Loading...</h2> :
            <div className="container">
                <div className="row">
                    <div className="col-md-10 m-auto">
                    <br /> <br />
                    <Link to="/" className="btn btn-outline-warning float-left">
                    Back to Library
                    </Link>
                    </div>
                    <br />
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Book's Record</h1>
                    <hr /> <br />
                    </div>
                </div>
            <div>
                  
                    <div>
                    <table className="table table-hover table-dark">
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Title</td>
                        <td>{book.book.title}</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Author</td>
                        <td>{ book.book.author }</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>ISBN</td>
                        <td>{ book.book.isbn }</td>
                        </tr>
                        <tr>
                        <th scope="row">4</th>
                        <td>Publisher</td>
                        <td>{ book.book.publisher }</td>
                        </tr>
                        <tr>
                        <th scope="row">5</th>
                        <td>Description</td>
                        <td>{ book.book.description }</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                
            </div>
                

            <div className="row">
                <div className="col-md-6">
                <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={onDeleteClick}>Delete Book</button><br />
                </div>

                <div className="col-md-6">
                <Link to={`/edit-book/${id}`} className="btn btn-outline-info btn-lg btn-block">
                        Edit Book
                </Link>
                <br />
                </div>

            </div>
            
                {/* <br />
                <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
                <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> */}

            </div>
            }
      </div>
    )
}