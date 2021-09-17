// Code referenced from https://serverless-stack.com/chapters/create-a-login-page.html
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FormButton from "react-bootstrap/Button";
import {Button} from 'react-native';
import '../App.css';
import "./Login.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dumbbell from '../components/dumbell.png';
import LoginBackground from './FinalBackgrnd.jpg';

toast.configure();



export default function Login({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    document.getElementById("authenticationMess").innerHTML = "";
    const data = {
        username: username,
        password: password
    }
    try {
        await axios.post("http://localhost:8080/gymtrackerservices/api/gymmembers/authenticate",data)
        .then(res=>{
            const auth = res.data;
            if(auth.authenticated === true){
                toast("Logged In Successfully",{autoClose:2000,position:toast.POSITION.BOTTOM_CENTER})
                if(auth.role === 'user'){
                  navigation.navigate('Home', {id:auth.id})
                }else{
                  navigation.navigate('AdminHome')
                }
            }else{
                document.getElementById("authenticationMess").innerHTML = auth.message;
            }
        })
    }catch(e){
        alert(e.message);
    }
  }

  return (
      <div style={{backgroundImage:`url(${LoginBackground})`}}>
        <div className="Logo">
          <img src={Dumbbell} alt='website logo' className="Image"/>
          <h1>GymTracker</h1>
        </div>
        <div style={{backgroundColor:'white',width:'40%',margin:'auto',border: '5px solid black', textAlign:"center"}}>
          <h4 style={{textAlign: "center"}}> Log in to GymTracker</h4>
          <div className="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="username">
              <Form.Label>Username </Form.Label>
              <Form.Control
                autoFocus
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <br/>
            <Form.Group size="lg" controlId="password">
            <Form.Label>Password </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br/>
            <FormButton block size="lg" type="submit" align="center" disabled={!validateForm()}>
              Login
            </FormButton>
          </Form>
          <p id="authenticationMess" style={{textAlign:'center'}}></p>
          <Button
              title="Create a GymTracker Account"
              onPress={() => {
                navigation.navigate('CreateMemberAccount');
              }}
              color="#d3bc8d"
          />
        </div>
      </div>
      <div style={{marginBottom:"300px"}}></div>
    </div>
  );
}
