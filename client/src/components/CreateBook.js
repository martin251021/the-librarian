import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateBook() {

    const navigate = useNavigate()

    const [data, setData] = useState({
        title: "",
        isbn:"",
        author:"",
        description:"",
        published_date:"",
        publisher:"",
        img:""
      })

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

        axios.post("http://localhost:8082/api/books", bookData)
                .then(res => {
                    setData(prevState => ({...prevState, 
                        title: '',
                        isbn:'',
                        author:'',
                        description:'',
                        published_date:'',
                        publisher:'',
                        img: ""
                    }))
                    navigate("/")
                })
                .catch(err => {
                    console.log("Error in CreateBook!");
                  })
    }

    return(
        <div className="CreateBook">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-dark float-left">
              Back to Library
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Book</h1>
              <p className="lead text-center">
                  Create new book
              </p>

              <form noValidate onSubmit={onSubmit}>
                <div className='form-group'>
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
                  <input 
                    type='text'
                    placeholder='Image URL'
                    name='img'
                    className='form-control'
                    value={data.img}
                    onChange={onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-dark btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    )
}