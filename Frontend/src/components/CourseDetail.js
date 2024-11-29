import React, { useEffect, useState } from 'react'
import '../css/courseDetailStyle.css'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import {Badge, Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CourseDetail() {

  const [course, setCourse] = useState([]);

  const [cp, setCp] = useState("")

  useEffect(() => {
      axios.get(`http://localhost:8080/auth/admin/getCourses/${window.localStorage.getItem('id')}`, {
          headers: {
              Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`
          }
      })
      .then((response) => {
          console.log(response);
          setCourse(response?.data);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })

      axios.get(`http://localhost:8080/auth/admin/getCP/${window.localStorage.getItem('id')}`, {
          headers: {
              Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`
          }
      })
      .then((response) => {
          console.log(response);
          setCp(response?.data);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
  },[])

  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = () => {
    axios.put(
      `http://localhost:8080/auth/admin/update${window.localStorage.getItem('field')}/${course.id}/${window.localStorage.getItem('value')}`, 
      course, 
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`
        }
      }
    )
    .then((response) => {
      // Show a success toast if the update was successful
      toast.success("Update successful!", {
        position: toast.POSITION.TOP_RIGHT,
      });
  
      // Optionally update the UI without refreshing the page
      const updatedCourse = { ...course };
      const field = window.localStorage.getItem('field');
      const value = window.localStorage.getItem('value');
      updatedCourse[field] = value;
      setCourse(updatedCourse);
  
      // Close the modal
      handleClose();
    })
    .catch((error) => {
      // Show an error toast if the update fails
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  };
  

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/auth/admin/deleteCourse/${course.id}`, {
      headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`
      }
    })
    .then((response) => {
      window.location.href="http://localhost:3000/courseCatalog";
    })
    .catch((error) => {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
  }
    
  return (
    <div className='bgg'>
      <ToastContainer />
        <h1 id='titleLabel'>{course.name}</h1>

        <hr aria-orientation="vertical" /> 
            <div>
                <h3 className='cd' style={{paddingTop: "30px"}}>
                Course Code <span style={{paddingLeft: "10px"}} className='sp'></span> <Badge bg="secondary">{course.courseCode}</Badge>
              </h3>
              <h3 className='cd' style={{paddingTop: "30px"}}>
                Capacity <span style={{paddingLeft: "60px"}} className='sp'></span> <Badge bg="secondary">{course.capacity}</Badge>
              </h3>
              <h3 className='cd' style={{paddingTop: "30px"}}>
                Credits <span style={{paddingLeft: "88px"}} className='sp'></span> <Badge bg="secondary">{course.credits}</Badge>
              </h3>
              <h3 className='cd' style={{paddingTop: "30px"}}>
                Term <span style={{paddingLeft: "117px"}} className='sp'></span> <Badge bg="secondary">{course.term}</Badge>
              </h3>
              <h3 className='cd' style={{paddingTop: "30px"}}>
                Year <span style={{paddingLeft: "115px"}} className='sp'></span> <Badge bg="secondary">{course.year}</Badge>
              </h3>
              <h3 className='cd' style={{paddingTop: "30px"}}>
                Faculty <span style={{paddingLeft: "82px"}} className='sp'></span> <Badge bg="secondary">{course.faculty}</Badge>
              </h3>
              <h3 className='cd' style={{paddingTop: "30px"}}>
                Course <span style={{paddingLeft: "77px"}} className='sp'></span> <Badge bg="secondary">{cp}</Badge>
              </h3>
              <h3 className='cpd' style={{marginBottom: "0px"}}>
                Prerequisite 
              </h3>
            </div>

      <Button onClick={handleShow} id='updateBtn' variant="info">Modify</Button>{' '}
      <Button onClick={handleDelete} id='deleteBtn' variant="danger">Delete</Button>{' '}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropdownButton id="dropdown-basic-button" title="Select Field" 
          onSelect={function(evt){window.localStorage.setItem('field', evt)}}>
            <Dropdown.Item eventKey={'CourseCode'}>Course Code</Dropdown.Item>
            <Dropdown.Item eventKey={'Capacity'}>Capacity</Dropdown.Item>
            <Dropdown.Item eventKey={'Credits'}>Credits</Dropdown.Item>
            <Dropdown.Item eventKey={'Term'}>Term</Dropdown.Item>
            <Dropdown.Item eventKey={'Year'}>Year</Dropdown.Item>
            <Dropdown.Item eventKey={'Faculty'}>Faculty</Dropdown.Item>
            <Dropdown.Item eventKey={'CoursePrerequisite'}>Course Prerequisite ID</Dropdown.Item>
          </DropdownButton>

          <input id='inp' name='updateValue' onChange={e  => window.localStorage.setItem('value', e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default CourseDetail