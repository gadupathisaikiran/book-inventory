import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const BookForm = () => {
  const [input, setInput] = useState({title:"",author:""});


  const [bookList, setBookList] = useState([]);




  async function handleSubmit() {
   

    const res=await axios.post("http://localhost:5001/books",input)

    if(res){
        toast(res.data.message)



// Get all input elements
const inputFields = document.querySelectorAll('input');

// Loop through each input element and clear its value
inputFields.forEach((input) => {
  input.value = '';
});

    }
  


  };




//   function used to delete books from booklist by indx value
async function handleDelete(index){

    const res=await axios.delete(`http://localhost:5001/books/${index}`)

  if(res.data){
    toast(res.data.message)
  }


}





  useEffect(()=>{
async function main(){
    const res=await axios.get("http://localhost:5001/books")

if(res.data){
    setBookList(res.data)

    console.log(res.data)
}

}

main()

  },[bookList])


  

  return (
    <>
   <ToastContainer/>
   
    <div className="container mt-4">
   
      <div className="card">
        <div className="card-header">
          <h4>Add Book</h4>
        </div>
        <div className="card-body">
       
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
           
                onChange={(e)=>{setInput({...input,title:e.target.value})}}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
              
                onChange={(e)=>{setInput({...input,author:e.target.value})}}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>{handleSubmit()}}>
              Add
            </button>
        
        </div>
      </div>
      <div className="mt-4">
        <h4>Past Posted Books</h4>
        {bookList.length > 0 ? (
          <ul className="list-group">
            {bookList.map((book, index) => (
              <li className="list-group-item" key={index}>
                <span className="fw-bold">{book.title}</span> by{' '}
                <span className="fw-bold">{book.author}</span>

                <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>


              </li>
            ))}
          </ul>
        ) : (
          <p>No books posted yet.</p>
        )}
      </div>
    </div>

    </>
  );
};

export default BookForm;

