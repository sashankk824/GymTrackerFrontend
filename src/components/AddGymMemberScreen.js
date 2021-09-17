import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from 'react-native';
import Dumbbell from './dumbell.png'
import '../App.css';

toast.configure();

class AddGymMember extends React.Component{
    handleSubmit(event){
        event.preventDefault()
        const data = {
            firstName:this.firstName,
            lastName:this.lastName,
            age:this.age,
            experience:this.experience,
            username:this.username,
            password:this.password,
            role:this.role
        }
        axios.post("http://localhost:8080/gymtrackerservices/api/gymmembers",data)
        .then(res=>{
            toast("Gym Member added successfully!",{autoClose:2000,position:toast.POSITION.BOTTOM_CENTER})
            this.props.navigation.navigate('AdminHome');
        })
    }

    render(){
        return(<div style={{backgroundColor:'silver'}}>
            <div className="LogoMini">
                <img src={Dumbbell} alt='website logo' className="ImageMini"/>
                <h4>GymTracker</h4>
            </div>
             <h2 style={{textAlign:'center'}}>Create Gym Member Account:</h2>
             <div style={{textAlign:'center'}}>
             <form>
                <br/>
                <p style={{margin:'auto'}}>First Name: <input type="text" name="firstName" onChange={event=>this.firstName=event.target.value}/></p>
                <br/>
                <br/>
                <p style={{margin:'auto'}}>Last Name: <input type="text" name="lastName" onChange={event=>this.lastName=event.target.value}/></p>
                <br/>
                <br/>
                <p style={{margin:'auto'}}>Age: <input type="text" name="age" onChange={event=>this.age=event.target.value}/></p>
                <br/>
                <br/>
                <p style={{margin:'auto'}}>Experience: <input type="text" name="experience" onChange={event=>this.experience=event.target.value}/></p>
                <br/>
                <br/>
                <p style={{margin:'auto'}}>Username: <input type="text" name="username" onChange={event=>this.username=event.target.value}/></p>
                <br/>
                <br/>
                <p style={{margin:'auto'}}>Password: <input type="password" name="password" onChange={event=>this.password=event.target.value}/></p>
                <br/>
                <br/>
                <p style={{margin:'auto'}}>User role ('admin' or 'user'): <input type="text" name="role" onChange={event=>this.role=event.target.value}/></p>
                <br/>
                <br/>
                <p style={{margin:'auto'}}><button onClick={this.handleSubmit.bind(this)}>Confirm</button></p>
                <br/>
                <br/>
            </form>
            </div>
            <div style={{width:'70%',margin:'auto'}}>
            <Button
            title="Return to Admin Home Screen"
            color="#d3bc8d"
            onPress={() => {
              this.props.navigation.navigate('AdminHome');
            }}
            />
            </div>
          <div style={{padding:'150px'}}></div>
        </div>
        )
    }
}

export default AddGymMember;