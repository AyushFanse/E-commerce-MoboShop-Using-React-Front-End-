import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import { EditTwoTone } from '@mui/icons-material';
import { useParams } from "react-router-dom";
import Navbar from '../../Components/Navbar/Navbar';
import { Alert, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import "./user.css";

const User = ({DataBase}) => {

  const [data, setData] = useState([]);
  const [Worning,setWorning] = useState('');
  const {userId} = useParams();
  const contactForm = useRef();
  const FatchRef = useRef();
  const localToken = localStorage.getItem('token');
  const decodedToken = jwt.decode(localToken);
  const history = useHistory();
  
  useEffect(()=>{
        
    if(decodedToken===null){
        history.push('/');
    }else{
            if(decodedToken.exp*1000<=Date.now()){
              localStorage.removeItem('token');
              alert("Session Timeout Please Login Again...");
              history.push('/');
            }
        }
    },[decodedToken,history])
    

  useEffect( () => { 
    FatchRef.current();
  },[])
  
  const Fatch = (async()=>{
      let response = await axios.get(`${DataBase}/users/getuser/${userId}`)
      setData(response.data);

  })
  
  FatchRef.current = Fatch;
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = contactForm.current;
     
    try{   
          let response = await axios.patch(`${DataBase}/users/updateuser/${userId}`, {
                first_name:updatedData.first_name.value,
                last_name:updatedData.last_name.value,
                username:updatedData.username.value,
                email:updatedData.email.value,
                address:updatedData.address.value,
                number:updatedData.number.value
            } )

            setWorning(response.data);
            setTimeout(()=>{setWorning('')},3000);
            history.push('/profile');
            Fatch();
    } catch (err){
            setWorning({status:'error', msg:err.response.status + ' ' + err.response.statusText });
            setTimeout(()=>{setWorning('')},3000);
    }
  }

  return (
    <div className="user">
    <Navbar page={'Edit User'} />
      <div className="userTitleContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit <EditTwoTone/></span>
          {
                        Worning===''
                    ? 
                      null
                    : 
                      (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="filled" severity={Worning.status}>{Worning.msg}</Alert>
                        </Stack>
                      )
                }
          <form className="userUpdateForm"  ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name='username'
                  placeholder={ data.username }
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  name='first_name'
                  placeholder={ data.first_name }
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  name='last_name'
                  placeholder={ data.last_name }
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name='email'
                  placeholder={ data.email }
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name='number'
                  placeholder={ data.number }
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  name='address'
                  placeholder={ data.address }
                  className="userUpdateInput"
                />
              </div>              
              <div className="userUpdateItem">
                <button className="userUpdateButton"  type="submit">Update</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;