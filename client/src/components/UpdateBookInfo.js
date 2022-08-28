import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function UpdateBookInfo() {

    const {id} = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState({
        title: "",
        isbn:"",
        author:"",
        description:"",
        published_date:"",
        publisher:"",
        img: ""
      })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            setError(false)
            try {
                const response = await axios(`http://localhost:8082/api/books/${id}`)
                setData(prevState => ({
                    ...prevState,
                    title: response.data.title,
                    isbn: response.data.isbn,
                    author: response.data.author,
                    description: response.data.description,
                    published_date: response.data.published_date,
                    publisher: response.data.publisher,
                    img: response.data.img
                }))
                setLoading(false)
            } catch(err) {
                console.log(err)
            }
        }

        fetchData()
    }, [id])

    const onChange = (e) => {
        setData(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const bookData = {
            title: data.title,
            isbn: data.isbn,
            author: data.author,
            description: data.description,
            published_date: data.published_date,
            publisher: data.publisher,
            img: data.img
          };

        axios.put(`http://localhost:8082/api/books/${id}`, bookData)
                .then(res => {
                    navigate(`/show-book/${id}`)
                })
                .catch(err => {
                    console.log("Error in UpdateBook!");
                  })
    }


    return(
        <div className="UpdateBookInfo">
        { loading ? <h1>Loading...</h1> :
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Back to Library
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Book</h1>
              <p className="lead text-center">
                  Update Book's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor="title">Title</label>
              <input
                type='text'
                placeholder='Title of the Book'
                name='title'
                className='form-control'
                value={data.title}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="isbn">ISBN</label>
              <input
                type='text'
                placeholder='ISBN'
                name='isbn'
                className='form-control'
                value={data.isbn}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="author">Author</label>
              <input
                type='text'
                placeholder='Author'
                name='author'
                className='form-control'
                value={data.author}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="description">Description</label>
              <input
                type='text'
                placeholder='Describe this book'
                name='description'
                className='form-control'
                value={data.description}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="published_date">Published Date</label>
              <input
                type='date'
                placeholder='published_date'
                name='published_date'
                className='form-control'
                value={data.published_date}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="publisher">Publisher</label>
              <input
                type='text'
                placeholder='Publisher of this Book'
                name='publisher'
                className='form-control'
                value={data.publisher}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="publisher">Image URL</label>
              <input
                type='text'
                placeholder='Image URL'
                name='img'
                className='form-control'
                value={data.img}
                onChange={onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Book</button>
            </form>
          </div>

        </div>
        }
      </div>
    )
}