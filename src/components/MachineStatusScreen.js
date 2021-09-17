import React from 'react';
import axios from 'axios';
import {Button} from 'react-native';

class MachineStatus extends React.Component{

    state = {
        machineData:[]
    }

    componentWillMount(){
        axios.get("http://localhost:8080/gymtrackerservices/api/machinedata/latestMachineUsage").then(res=>{
            const machineData = res.data;
            this.setState({machineData})
        })
    }
    render(){
        return(<div style={{backgroundColor:'black'}}>
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
                    {this.state.machineData.map(machine=><RowCreator item={machine}/>)}
                </tbody>
            </table>
            <br/>
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
            <div style={{padding:'250px'}}></div>
        </div>
        )
    }
}

class RowCreator extends React.Component{
    render(){
        var mach = this.props.item;
        var occ = mach.occupied ? 'Occupied' : 'Available';
        var availColor = (occ === 'Available') ? 'green' : 'red'
        var date = new Date(mach.measuredDateTime).toLocaleString();
        return <tr>
                <td>{mach.machineName}</td>
                <td style={{color:availColor}}>{occ}</td>
                <td>{mach.setsByReps}</td>
                <td>{date}</td>
            </tr>
    }
}

export default MachineStatus;