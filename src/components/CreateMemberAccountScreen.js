import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from 'react-native';
import Dumbbell from '../components/dumbell.png'; 
import '../App.css';

toast.configure();

class CreateMemberAccount extends React.Component{
    handleSubmit(event){
        event.preventDefault()
        const data = {
            firstName:this.firstName,
            lastName:this.lastName,
            age:this.age,
            experience:this.experience,
            username:this.username,
            password:this.password,
            role:'user'
        }
        axios.post("http://localhost:8080/gymtrackerservices/api/gymmembers",data)
        .then(res=>{
            toast("Gym Member created successfully!",{autoClose:2000,position:toast.POSITION.BOTTOM_CENTER})
            this.props.navigation.navigate('Login');
        })
    }

    render(){
        return(<div style={{backgroundColor:'silver'}}>
            <div className="LogoMini">
                <img src={Dumbbell} alt='website logo' className="ImageMini"/>
                <h4>GymTracker</h4>
            </div>
            <div style={{textAlign:'center'}}>
                <h2>Create Gym Member Account:</h2>
                <form>
                    <br/>
                    First Name: <input type="text" name="firstName" onChange={event=>this.firstName=event.target.value}/>
                    <br/>
                    <br/>
                    <br/>
                    Last Name: <input type="text" name="lastName" onChange={event=>this.lastName=event.target.value}/>
                    <br/>
                    <br/>
                    <br/>
                    Age: <input type="text" name="age" onChange={event=>this.age=event.target.value}/>
                    <br/>
                    <br/>
                    <br/>
                    Experience: <input type="text" name="experience" onChange={event=>this.experience=event.target.value}/>
                    <br/>
                    <br/>
                    <br/>
                    Username: <input type="text" name="username" onChange={event=>this.username=event.target.value}/>
                    <br/>
                    <br/>
                    <br/>
                    Password: <input type="password" name="password" onChange={event=>this.password=event.target.value}/>
                    <br/>
                    <br/>
                    <br/>
                    <button onClick={this.handleSubmit.bind(this)}>Confirm</button>
                </form>
            </div>
            <br/>
            <br/>
            <div style={{width:'40%',margin:'auto'}}>
                <Button
                title="Return to Login Screen"
                color="#d3bc8d"
                onPress={() => {
                this.props.navigation.navigate('Login');
                }}
                />
            </div>
            <div style={{padding:'500px'}}></div>
        </div>
        )
    }
}

export default CreateMemberAccount;