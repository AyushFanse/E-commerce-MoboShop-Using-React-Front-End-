<<<<<<< HEAD
import { Grid, Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  DeleteOutline,
  PhoneAndroid, 
  FaceRounded, 
  AdminPanelSettingsOutlined, 
  EditTwoTone 
} from '@mui/icons-material';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import "./user.css";

const ProfileComponent = ({ DataBase })=>{

const history = useHistory();
const [userData, setUser] = useState('');
const localToken = localStorage.getItem('token');
const decodedToken = jwt.decode(localToken);
const FatchRef = useRef();
const user = decodedToken.user;

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
    
    const Fatch = async() => {
        let responseUsers = await axios.get(`${DataBase}/users/getuser/${user._id}`,
        {
            headers:{ token:localToken }
        })
        
        setUser(responseUsers.data);
      }
  
      FatchRef.current = Fatch;

const DeleteAccount = (async (id)=>{
    if(window.confirm('Are you sure to delete this record?')){
        let res = await axios.delete(`${DataBase}/users/deleteuser/${id}`)
        localStorage.removeItem('token');
            if(res.ok){
                alert('Your Account has been deleted Successfully');
            }
        }
})

return (
    <Box sx={{ flexGrow: 1}}>
        <Navbar page={'Profile'} />
        <Grid container  sx={{'& .MuiTextField-root':{ mt:3},display: 'flex', justifyContent: 'center',mt:7}}>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <FaceRounded
                            className="userShowImg" sx={{fontSize: '2.5rem'}}
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{ userData.first_name } { userData.last_name }</span>
                            <span className="userShowUserTitle">{ userData.email }</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{ userData.username }</span>
                        </div>
                        <div className="userShowInfo">
                            <AdminPanelSettingsOutlined className="userShowIcon" />
                            <span className="userShowInfoTitle">{ userData.post }</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">{ userData.number }</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{ userData.email }</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{ userData.address }</span>
                        </div>
                    </div>
                    <div className='actionButtons'>
                        <Link to={"/profile/" + user._id}>
                            <button className="userAddButton">Edit<EditTwoTone/></button>
                        </Link>
                        <button className="userDeleteButton">Delete <DeleteOutline className="userListDelete" onClick={() => DeleteAccount(user._id)}/> </button>
                    </div>
                </div>         
            </div>         
        </Grid>
    </Box>
    );
}

=======
import { Grid, Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  DeleteOutline,
  PhoneAndroid, 
  FaceRounded, 
  AdminPanelSettingsOutlined, 
  EditTwoTone 
} from '@mui/icons-material';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import "./user.css";

const ProfileComponent = ({ DataBase })=>{

const history = useHistory();
const [userData, setUser] = useState('');
const localToken = localStorage.getItem('token');
const decodedToken = jwt.decode(localToken);
const FatchRef = useRef();
const user = decodedToken.user;

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
    
    const Fatch = async() => {
        let responseUsers = await axios.get(`${DataBase}/users/getuser/${user._id}`,
        {
            headers:{ token:localToken }
        })
        
        setUser(responseUsers.data);
      }
  
      FatchRef.current = Fatch;

const DeleteAccount = (async (id)=>{
    if(window.confirm('Are you sure to delete this record?')){
        let res = await axios.delete(`${DataBase}/users/deleteuser/${id}`)
        localStorage.removeItem('token');
            if(res.ok){
                alert('Your Account has been deleted Successfully');
            }
        }
})

return (
    <Box sx={{ flexGrow: 1}}>
        <Navbar page={'Profile'} />
        <Grid container  sx={{'& .MuiTextField-root':{ mt:3},display: 'flex', justifyContent: 'center',mt:7}}>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <FaceRounded
                            className="userShowImg" sx={{fontSize: '2.5rem'}}
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{ userData.first_name } { userData.last_name }</span>
                            <span className="userShowUserTitle">{ userData.email }</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{ userData.username }</span>
                        </div>
                        <div className="userShowInfo">
                            <AdminPanelSettingsOutlined className="userShowIcon" />
                            <span className="userShowInfoTitle">{ userData.post }</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">{ userData.number }</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{ userData.email }</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{ userData.address }</span>
                        </div>
                    </div>
                    <div className='actionButtons'>
                        <Link to={"/profile/" + user._id}>
                            <button className="userAddButton">Edit<EditTwoTone/></button>
                        </Link>
                        <button className="userDeleteButton">Delete <DeleteOutline className="userListDelete" onClick={() => DeleteAccount(user._id)}/> </button>
                    </div>
                </div>         
            </div>         
        </Grid>
    </Box>
    );
}

>>>>>>> 92347de19b2dffdddb9377a24bd634ef5d0f91a2
export default ProfileComponent;