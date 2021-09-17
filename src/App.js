import './App.css';
import HomeScreen from './components/HomeScreen';
import CollectGymDataScreen from './components/CollectGymDataScreen'
import AddGymMemberScreen from './components/AddGymMemberScreen';
import AnalyzeLiftsScreen from './components/AnalyzeLiftsScreen';
import MachineStatusScreen from './components/MachineStatusScreen';
import LoginScreen from './containers/LoginScreen';
import AdminHomeScreen from './components/AdminHomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateMemberAccountScreen from './components/CreateMemberAccountScreen'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MachineStatus" component={MachineStatusScreen} />
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="AdminHome" component={AdminHomeScreen}/>
        <Stack.Screen name="AnalyzeLifts" component={AnalyzeLiftsScreen}/>
        <Stack.Screen name="AddGymMember" component={AddGymMemberScreen}/>
        <Stack.Screen name="CollectGymData" component={CollectGymDataScreen}/>
        <Stack.Screen name="CreateMemberAccount" component={CreateMemberAccountScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
