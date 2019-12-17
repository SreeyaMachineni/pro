import * as React from "react";
import { Image, StyleSheet, View,Text,TouchableOpacity } from "react-native";
import imageLogo from "../assets/images/logo1.png";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Welcome from '../screens/Welcome';
import {AsyncStorage} from 'react-native';
import HomeScreen from '../App';
import Register from '../screens/Registration';

class Home extends React.Component{

    constructor(){
        super();
        this.handleLoginPress= this.handleLoginPress.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    state={
        email:"",
        password:""
    }

    handleEmailChange = (email:String)=>{
        this.setState({
            email:email
        })
    }

    handlePasswordChange = (password:String)=>{
        this.setState({
            password:password
        })
    }

    registerUser(){
        this.props.navigation.navigate('Register');
    }

    handleLoginPress(){
        if(this.state.email == '' || this.state.password == ''){
            alert('please enter details');
            return;
        }

        fetch('http://192.168.195.52:3000/users/authenticate', {
          method: 'POST',
          headers: {
                   'Content-Type': 'application/json'
                   },
          body: JSON.stringify({firstName: this.state.email, password: this.state.password})
        })
       .then(function(response){
        return response.json();
       })
       .then(function(data){
         this.props.navigation.navigate('Welcome');
         this.storeUserData(data.user)
       }.bind(this));
    }

    async storeUserData(user){
        try{
            var jsonOfItem =   await AsyncStorage.setItem('user',JSON.stringify(user));
        }catch(err){
        console.log(err.message)
        }
    }

    render(){
        return (
            <>
                <View style={styles.cont}>
                    <Image source={imageLogo} style={styles.logo}/>
                    <Text>SAFE 2 CALL</Text>
                </View>
                <View style={styles.cont1}>
                    <FormTextInput
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    placeholder='email'
                    />
                    <FormTextInput
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    placeholder='password'
                    />
                     <TouchableOpacity style={styles.buttonContainer} onPress={this.handleLoginPress}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                     <TouchableOpacity onPress={this.registerUser}>
                         <Text>Sign Up</Text>
                     </TouchableOpacity>

                </View>
            </>
        );
    }
}





const styles = StyleSheet.create({
    logoContainer:{
        alignItems:'center'
    },

  logo: {
    width:150,
      height:150,


  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems:'center'
  },
  backgroundContainer:{
      flex:2,
      width:null,
      height:null,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#F5FCFF'
  },
  cont:{
  flex:2,
  backgroundColor:'white',
   justifyContent: "center",
      alignItems:'center'
  },
  cont1:{
    flex:4,
    backgroundColor:'white',
    justifyContent: "center",
          alignItems:'center'
    },
    loginButton:{
    margin:20
    },
    buttonContainer:{
         width: "72%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e6005c",
            margin: 12,
            paddingVertical: 12,
            borderRadius: 4,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "red"
        },
         text: {
            color: "white",
            textAlign: "center",
            height: 20
          }
});

export default Home;