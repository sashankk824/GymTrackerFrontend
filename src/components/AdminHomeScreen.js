import React from 'react';
import axios from 'axios';
import {Button} from 'react-native';
import {Link} from 'react-router-dom';
import LoginScreen from '../containers/LoginScreen';

class AdminHome extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          gymMemberData: [],
          machineData: []
        };
      }

    componentWillMount(){
        axios.get("http://localhost:8080/gymtrackerservices/api/gymmembers/")
        .then(res=>{
            this.setState({
                gymMemberData: res.data
            })
        })
        axios.get("http://localhost:8080/gymtrackerservices/api/machinedata/latestMachineUsage").then(res=>{
            const machineData = res.data;
            this.setState({machineData: machineData})
        })

        this.props.navigation.addListener(
          'focus',
          payload => {
            axios.get("http://localhost:8080/gymtrackerservices/api/gymmembers/")
            .then(res=>{
                this.setState({
                    gymMemberData: res.data
                })
            })
          }
        );
    }
    render(){
        return(<div style={{backgroundColor:'black'}}>
            <h1 style={{color:'white'}}>Admin Home Page</h1>
            <hr style={{border:'3px solid #d3bc8d'}}/>
            <h2 style={{textAlign:'center',color:'white'}}>Machine Status Availability</h2>
            <table align='center'>
                <thead>
                <tr>
                    <th>Machine Name</th>
                    <th>Availability Status</th>
                    <th>Sets Left</th>
                    <th>Measured Date Time</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.machineData.map(machine=><RowCreator2 item={machine}/>)}
                </tbody>
            </table>
            <h2 style={{textAlign:'center',color:'white'}}>List of Gym Members</h2>
            <table style={{margin:'0 auto'}}>
            <tr>
            <td><b>First Name</b></td>
            <td><b>Last Name</b></td>
            <td><b>Age</b></td>
            <td><b>Experience</b></td>
            <td><b>Username</b></td>
            <td><b>Password</b></td>
          </tr>
            {this.state.gymMemberData.map(gymMember=><RowCreator item={gymMember}/>)}
            </table>
          <div style={{width:'70%',margin:'auto'}}>
            <br/>
            <br/>
            <Button
            title="Add Gym Member"
            color="#d3bc8d"
            onPress={() => {
              this.props.navigation.navigate('AddGymMember');
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
          <div style={{padding:"100px"}}></div>
        </div>
        )
    }
}

class RowCreator extends React.Component{
    render(){
        var member = this.props.item;
        return <tr>
            <td>{member.firstName}</td>
            <td>{member.lastName}</td>
            <td>{member.age}</td>
            <td>{member.experience}</td>
            <td>{member.username}</td>
            <td>{member.password}</td>
        </tr>;
    }
}

class RowCreator2 extends React.Component{
  render(){
      var mach = this.props.item;
      var occ = mach.occupied ? 'Occupied' : 'Available';
      return <tr>
              <td>{mach.machineName}</td>
              <td>{occ}</td>
              <td>{mach.setsByReps}</td>
              <td>{mach.measuredDateTime}</td>
          </tr>
  }
}

export default AdminHome;