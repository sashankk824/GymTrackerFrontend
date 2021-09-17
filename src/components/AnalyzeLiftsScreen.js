import React from 'react';
import axios from 'axios';
import {Button} from 'react-native';

class AnalyzeData extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          machineData: []
        };
      }

    componentWillMount(){
        const {id} = this.props.route.params
        axios.get("http://localhost:8080/gymtrackerservices/api/gymmembers/analyze/"+
        id).then(res=>{ 
            this.setState({machineData: res.data.machineData})
        })
    }

    render(){
        return(<div style={{backgroundColor:'black'}}>
            <h2 style={{textAlign:'center',color:'white'}}>Latest Machine Usage Report</h2>
            {this.state.machineData.map(eachEntry=><TableCreator item={eachEntry}/>)}
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
            <div style={{padding:"500px"}}></div>
        </div>
        )
    }
}

class TableCreator extends React.Component{
    render(){
        var eachEntry = this.props.item;
        var date = new Date(eachEntry.measuredDateTime).toLocaleString();
        return (<div>
            <table>
                <tr>
                    <td><b>{eachEntry.exercise}</b></td>
                    <td style={{backgroundColor:'black'}}></td>
                    <td style={{backgroundColor:'black'}}></td>
                </tr>
                <tr>
                    <td>Sets by Reps: {eachEntry.setsByReps}</td>
                    <td>Machine Weight: {eachEntry.machineWeight}</td>
                    <td>Measured Date Time: {date}</td>
                </tr>
            </table>
        </div>
        )
    }
}

export default AnalyzeData;