import React, {useState} from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/loginStyle.css'
import { Link } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  var check = 0

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: data.username,
      password: data.password
    };

  const login = () => {
    <Link to="/courseCatalog">Checkout</Link>
  }

    const cred = JSON.stringify(userData);
    // console.log(cred);
    axios.post("http://localhost:8080/auth/generateToken", cred, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response != "") {
        window.localStorage.setItem("auth_token", response.data)
        console.log(response.data);
        window.location.href = "http://localhost:3000/courseCatalog";
        
      }
      // console.log(response.status, response.data);
    }
    )
    .catch((error) => {
      console.log(error.message);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
  };

  return (
    <>
    <ToastContainer />
      <div className='bg'>
          
      </div>

      <Form className='form' onSubmit={handleSubmit}>
        <Form.Text style={{fontSize: "40px", marginLeft: "6vh"}} className='title'>Login</Form.Text>
        <Form.Group className="mb-3 fgroup" controlId="formBasicEmail">
          <div className='label'>
            <Form.Label>Username</Form.Label>
          </div>
          <Form.Control placeholder="Enter username"  onChange={e => setData({
      ...data,
      username: e.target.value
    })} />
        </Form.Group>

        <Form.Group className="mb-3 fgroup" controlId="formBasicPassword">
          <div className='label'>
            <Form.Label>Password</Form.Label>
          </div>
          <Form.Control type="password" placeholder="Password" onChange={e => setData({
      ...data,
      password: e.target.value
    })} />
        </Form.Group>
        <Button style={{marginLeft: "12vh"}} variant="primary" type="submit">
          Submit
        </Button>
    </Form>

    

    </>
  )
}

export default Login