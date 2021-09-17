import React from 'react';
import axios from 'axios';
import {Button} from 'react-native';

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          id: 0,
          firstName: "",
          lastName: "",
          machineData: []
        };
      }

    componentWillMount(){
        const {id} = this.props.route.params
        axios.get("http://localhost:8080/gymtrackerservices/api/gymmembers/"+id)
        .then(res=>{
            this.setState({
                id: id,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                machineData: res.data.machineData
            })
        })

        this.props.navigation.addListener(
            'focus',
            payload => {
                axios.get("http://localhost:8080/gymtrackerservices/api/gymmembers/"+id)
                .then(res=>{
                    this.setState({
                        id: id,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        machineData: res.data.machineData
                    })
                })
            }
          );
    }
    render(){
        return(<div style={{backgroundColor:'black'}}>
            <h2 style={{textAlign:'center',color:'white'}}>{this.state.firstName} {this.state.lastName}'s Gym Tracker Home Page </h2>
            <hr style={{border:'3px solid #d3bc8d'}}/>
            <div style={{width:'70%',margin:'auto'}}>
              <br/>
              <Button
              title="View the Occupation Status of All Machines"
              color="#d3bc8d"
              onPress={() => {
                this.props.navigation.navigate('MachineStatus');
              }}
              />
              <br/>
              <br/>
              <Button
              title="View Latest Statistics for All Lifts"
              color="#d3bc8d"
              onPress={() => {
                this.props.navigation.navigate('AnalyzeLifts', {id:this.state.id});
              }}
              />
              <br/>
            </div>
            <h2 style={{textAlign:'center',color:'white'}}>Overall Machine Usage Report</h2>
            <table style={{margin:'0 auto'}}>
            <tr style={{margin:'auto'}}>
            <td><b>Exercise</b></td>
            <td><b>Machine Weight</b></td>
            <td><b>Machine Name</b></td>
            <td><b>Sets by Reps</b></td>
            <td><b>Measured Date Time</b></td>
            </tr>
              {this.state.machineData.map(machine=><RowCreator item={machine}/>)}
            </table>
            <div style={{width:'70%',margin:'auto'}}>
              <br/>
              <br/>
              <Button
              title="Add Lifting Data"
              color="#d3bc8d"
              onPress={() => {
                this.props.navigation.navigate('CollectGymData', {id:this.state.id});
              }}
              />
              <br/>
              <br/>
              <Button
              title="Return to Login Screen"
              color="#d3bc8d"
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
              />
            </div>
            <div style={{padding:'100px'}}></div>
        </div>
        )
    }
}

class RowCreator extends React.Component{
    render(){
        var mach = this.props.item;
        var date = new Date(mach.measuredDateTime).toLocaleString();
        return <tr style={{margin:'auto'}}>
            <td>{mach.exercise}</td>
            <td>{mach.machineWeight}</td>
            <td>{mach.machineName}</td>
            <td>{mach.setsByReps}</td>
            <td>{date}</td>
        </tr>;
    }
}

export default Home;