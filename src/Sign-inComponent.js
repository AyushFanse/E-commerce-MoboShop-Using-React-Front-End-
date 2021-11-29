import React from 'react';
import axios from 'axios';
import {IconButton,Button,Grid,TextField,FormControl,InputLabel,Input,AppBar,Link,Toolbar,Typography,InputAdornment,Box} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';



const LoginComponent = (props) => {


const [email, setEmail] = React.useState('');
const [password,setPassword] = React.useState('');
const [fname,setFname] = React.useState('');
const [lname,setLname] = React.useState('');
const [address,setAddress] = React.useState('');
const [username,setUsername] = React.useState('');
const [phone,setPhone] = React.useState('');
const [showPassword,setShowPassword] = React.useState('');
    
const handleClickShowPassword = (e) => {
    setShowPassword(e.currentTarget);
};

const handleMouseDownPassword = (event) => {
event.preventDefault();
setShowPassword('');
};

const handleSubmit = async (e) => {

e.preventDefault();
    try{
        await axios.post('http://localhost:3001/register/registerUser', {
            username:username.value,
            fname:fname.value,
            lname:lname.value,
            email: email.value,
            address:address.value,
            phone:phone.value,
            password: password.value
        })
        

    props.history.push('/');
        
    } catch (err) {
        alert('Please Enter the Valide Data..!!!');
        console.warn(err);
    }
}

var captchaCallback = ()=>{
    ('textarea#g-recaptcha-response').parents('form').trigger('inputsChanged')};
var renderCaptcha =()=>{

return ('g-recaptcha', {
    'sitekey' : '6LctQg4UAAAAAFWvn4zhyn7XymfcTN2sl5vZ9JTb',
    'callback': captchaCallback
}),
document.querySelector('#g-recaptcha iframe').setAttribute('title', "reCAPTCHA to prove that you're not a robot.")
};

return (
    <>
        <Box>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton onClick={()=>{props.history.goBack()}} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <NavigateBeforeIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Sign-in
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{'& .MuiTextField-root':{ mt:2},display: 'flex', justifyContent: 'center',mt:10}}>
                <Grid style={{padding:"20px", background:'#c8e4fb', width:'377px', borderRadius:'16px'}}  sx={{border:2, borderColor: 'primary.main'}}>
                    <form  style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1.8,width: '12ch' }}}>
                            <TextField
                                id="standard"
                                label="First-Name"
                                size="small"
                                variant="standard"
                                autofocus="autofocus" aria-required="true"
                                value={props.fname}
                                onChange={(e) => {setFname(e.currentTarget)}}
                                />
                            <TextField
                                id="standard"
                                label="Last-Name"
                                size="small"
                                variant="standard"
                                value={props.lname}
                                onChange={(e) => {setLname(e.currentTarget)}}
                                />
                        </Box>
                        <Box component="form" sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                            <TextField
                                id="standard"
                                label="Username"
                                size="small"
                                variant="standard"
                                value={props.username}
                                onChange={(e) => {setUsername(e.currentTarget)}}
                                />
                        </Box>
                        <Box component="form" sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                            <TextField
                                id="standard"
                                label="Number"
                                size="small"
                                variant="standard"
                                value={props.phone}
                                onChange={(e) => {setPhone(e.currentTarget)}}
                                />
                        </Box>
                        <FormControl sx={{ '& .MuiTextField-root': { m: 0}}}>
                            <InputLabel htmlFor="standard-adornment-password" sx={{ml:-1.7}}>Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPassword? 'text' : 'password'}
                                        value={props.password}
                                        size="small"
                                        sx={{width: 293}}
                                        onChange={(e) => {setPassword(e.currentTarget)}}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                >
                                                {showPassword ? <VisibilityOff />  : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1.8, width: 293}}}>
                            <TextField
                                    id="standard"
                                    label="Email"
                                    size="small"
                                    variant="standard"
                                    value={props.email}
                                    onChange={(e) => {setEmail(e.currentTarget)}}
                                    />                                    
                        </Box>
                        <Box component="form" sx={{  mt:-2, '& .MuiTextField-root': { m: 1.8, width: 293}}}>
                            <TextField
                                id="standard"
                                label="Address"
                                size="small"
                                variant="standard"
                                value={props.address}
                                onChange={(e) => {setAddress(e.currentTarget)}}
                                /></Box>
                        <Grid sx={{textAlign: 'center'}}>
                            <Button sx={{mt:2}} type="submit" variant="contained" disableElevation >
                                Create Account
                            </Button>
                            <Grid sx={{textAlign: 'center', mb:-2, cursor: 'pointer'}}>
                                <p>Already have account ? <Link onClick={() =>{props.history.push('/')}} variant="body2">Log-In</Link></p>
                            </Grid>                            
                        </Grid>
                    </form>
                </Grid>
                            // <div class="input-group captcha">
                            // <script type="text/javascript">
                            //             {captchaCallback}
                            //             {renderCaptcha}
                            // </script>
                            // <div id="g-recaptcha"><div><div><iframe title="reCAPTCHA to prove that you're not a robot." src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LctQg4UAAAAAFWvn4zhyn7XymfcTN2sl5vZ9JTb&amp;co=aHR0cHM6Ly9zaWdudXAuaGVyb2t1LmNvbTo0NDM.&amp;hl=en&amp;v=_7Co1fh8iT2hcjvquYJ_3zSP&amp;size=normal&amp;cb=tckfahiqsq6v" role="presentation" name="a-lqi69yxdn7o8" style={{ width:"304px", height:"78px" ,frameborder:"0", scrolling:"no" ,sandbox:"allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"}}></iframe></div><textarea id="g-recaptcha-response" name="g-recaptcha-response" class="g-recaptcha-response" style={{width: "250px", height: "40px", border: "1px solid rgb(193, 193, 193)", margin: "10px 25px", padding:" 0px", resize: "none", display: "none"}}></textarea></div><iframe style={{display: "none"}}></iframe></div>
                            // <script src="https://www.google.com/recaptcha/api.js?onload=renderCaptcha&amp;render=explicit&amp;hl=en" async="" defer=""></script>
                            // </div>
            </Box>    
                <p class="privacy tos" style={{fontSize: "12px", textAlign: "center" }}>
                        Signing up signifies that you have read and agree to the <a target="_blank" href="https://www.salesforce.com/company/legal/sfdc-website-terms-of-service/">Terms of Service</a> <span class="japan-only" style={{display:"none"}}>, the <a target="_blank" href="http://www.salesforce.com/jp/company/personalinfo.jsp">Salesforce Japan Privacy Statement</a></span> and our <a target="_blank" href="https://www.salesforce.com/company/privacy/">Privacy Policy</a>.<br/><a href="#" class="optanon-toggle-display" rel="nofollow">Cookie Preferences</a>.
                </p>
        </Box>            
    </>
)
}

export default LoginComponent;