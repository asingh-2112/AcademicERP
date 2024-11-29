import React, { useEffect, useState } from 'react'
import '../css/courseStyle.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CourseCatalog() {

    const [courses, setCourses] = useState([]);

    // const [courseId, setCourseId] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8080/auth/admin/getCourses", {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`
            }
        })
        .then((response) => {
            console.log("Auth Token : ",`${window.localStorage.getItem('auth_token')}`);
            setCourses(response?.data);
        })
        .catch((error) => {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
    },[])

    function navToCourseDetailPage() {
        window.location.href="http://localhost:3000/courseDetail";
    }

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href="http://localhost:3000/";
    }
 
  return (
    <div className='bgDesign'>
        <ToastContainer />
        <nav class="navbar navbar-expand-lg navbar-dark shadow-5-strong">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">IIIT B</a>

                <button
                class="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <i class="fas fa-bars"></i>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                </ul>
                <button class="btn btn-outline-secondary" type="submit" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </nav>

        <div>
            <h1 className='title'>Courses</h1>
        </div>

        <hr aria-orientation="vertical" /> 

        <div className='row'>
            {courses.map((course) => {
                return(
                    <div className='col-6'>
                    <Card key={course.id} className='card'>
                        <Card.Header>{course.courseCode}</Card.Header>
                        <Card.Body>
                            <Card.Title>{course.name}</Card.Title>
                            <Card.Text>
                                {course.descp}
                            </Card.Text>
                            <Button variant="primary" onClick={() => {
                                window.localStorage.setItem('id', course.id);
                                navToCourseDetailPage();
                            }}>View</Button>
                        </Card.Body>
                    </Card>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default CourseCatalog