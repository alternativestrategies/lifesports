import React, {useState, useEffect} from 'react';
import {Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


function NavbarNav(props) {

  const {display, setDisplay} = props;

  //delete sessions
  const deleteSessions = async () => {
    try{
      await axios.get('/users/logout');
      setDisplay('auth');
      window.location = '/';
    }catch(e) {
      console.log(e);
    }
  }

  //get session
  const getSession = async() => {
    try {
      const res = await axios.get('/users/sessions')
      if(res.data.session !== undefined){
        setDisplay('auth')
      } else {
        setDisplay('noAuth')
      }
    }
    catch(e){
      console.log(e)
    }
  }

  //calling the current user
  const [user, setUser] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/users/profile');
            console.log(res.data)
            setUser(res.data)
        } 
        catch(err){
            throw err;
        }
    }

    useEffect(() => {
        fetchUsers()
    }, []);

  //getting current user

  useEffect(() => {
    getSession()
  }, [])

  return (
    <Navbar expand="lg">
      <Link to="/" className="navbar-brand">LifeSports</Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav'/>
      <Navbar.Collapse id='basic-navbar-nav'>
      {display === "noAuth" ?
      //if user is not authenticated only show them login button
      <>
          <ul className="navbar-nav mr-auto">
        </ul>
        <Link to='/login'>
          <button className="btn greeting-btn">Login</button>
        </Link>
        </>:
        // if user is authenticated show them all options
        <>
        <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            <Link to="/exercise-list" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">Post New Workout</Link>
          </li>
          <li className="navbar-item">
          <Link to="/profile" className="nav-link">Profile</Link>
          </li>
          </ul>
          <div>
          <p className='d-none d-md-block greeting mr-4 mt-3'> Welcome {user.username} !</p>
          </div>
          
        <button className="btn greeting-btn" onClick={deleteSessions}>Log Out</button>
        </>
      }
      </Navbar.Collapse>
    </Navbar>

  );
}
export default NavbarNav;