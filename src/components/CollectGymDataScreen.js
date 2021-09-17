import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import {Button} from 'react-native';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class CollectGymData extends React.Component{
    state = {}

    componentWillMount(){
        const {id} = this.props.route.params
        axios.get("http://localhost:8080/gymtrackerservices/api/gymmembers/"+id)
        .then(res=>{
            this.setState(res.data)
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const {id} = this.props.route.params
        const data={
            gymmemberId:id,
            exercise:this.exercise,
            setsByReps:this.setsByReps,
            occupied:true,
            machineWeight:this.machineWeight,
            machineName:this.machineName,
            measuredDateTime:this.measuredDateTime
        }
        if(data.setsByReps === "0x0"){
            data.occupied = false;
        }
        axios.post("http://localhost:8080/gymtrackerservices/api/machinedata/",data)
        .then(res=>{
            toast("Gym Member Machine Data Saved Successfully",{autoClose:2000,position:toast.POSITION.BOTTOM_CENTER})
            this.props.navigation.navigate('Home')
        })
    }

    render(){
        return(<div style={{backgroundColor:'black'}}>
            <h2 style={{textAlign:'center',color:'white'}}>Gym Member Details</h2>
            <div style={{color:'white',textAlign:'center'}}>
                <p style={{margin:'auto'}}>First Name: {this.state.firstName}</p>
                <br/>
                <p style={{margin:'auto'}}>Last Name: {this.state.lastName}</p>
                <br/>
                <p style={{margin:'auto'}}>Age: {this.state.age}</p>
                <br/>
                <p style={{margin:'auto'}}>Experience: {this.state.experience}</p>
                <br/>
                <h2 style={{textAlign:'center',color:'white'}}> Gym Member Machine Data:</h2>
                <form>
                <p style={{margin:'auto'}}>Exercise: <select name="exercise" onChange={event=>this.exercise=event.target.value}>
                    <option>Select One</option>
                    <option value="Squat">Squat</option>
                    <option value="Bench Press">Bench Press</option>
                    <option value="Deadlift">Deadlift</option>
                </select></p>
                <br/>
                <p style={{margin:'auto'}}>Sets By Reps:<input type="text" name="setsByReps" onChange={event=>this.setsByReps=event.target.value}/></p>
                <br/>
                <p style={{margin:'auto'}}>Machine Weight:<input type="number" name="machineWeight" onChange={event=>this.machineWeight=event.target.value}/></p>
                <br/>
                <p style={{margin:'auto'}}>Machine Name:<select name="machineName" onChange={event=>this.machineName=event.target.value}>
                    <option>Select One</option>
                    <option value="Squat Rack #1">Squat Rack #1</option>
                    <option value="Squat Rack #2">Squat Rack #2</option>
                    <option value="Squat Rack #3">Squat Rack #3</option>
                    <option value="Bench Rack #1">Bench Rack #1</option>
                    <option value="Bench Rack #2">Bench Rack #2</option>
                    <option value="Bench Rack #3">Bench Rack #3</option>
                </select></p>
                <br/>
                <p style={{margin:'auto'}}>Measured Date Time (YYYY-MM-DDTHH:MM format)<input type="datetime-local" name="measuredDateTime" onChange={event=>this.measuredDateTime=event.target.value}/></p>
                <p><b>NOTE: For Measured Date Time, T is not a placeholder and HH:MM is expected in military time. Date GUI may not be supported outside of Chrome</b></p>
                <br/>
                <button onClick={this.handleSubmit.bind(this)}>Confirm</button>
            </form>
            </div>
            <br/>
            <div style={{width:'70%',margin:'auto'}}>
                <Button
                title="Return to Home Page"
                color="#d3bc8d"
                onPress={() => {
                    this.props.navigation.navigate('Home');
                }}
                />
            </div>
            <div style={{padding:'160px'}}></div>
        </div>
        )
    }
}

export default CollectGymData;