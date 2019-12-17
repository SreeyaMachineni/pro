import * as React from "react";
import { Image, StyleSheet, View,Text,Picker,TouchableOpacity } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import {AsyncStorage} from 'react-native';
import DatePicker from 'react-native-datepicker'
import FormTextInput from "../components/FormTextInput";
import Button from "../components/Button";


class Register extends React.Component{


static navigationOptions = ({ navigation }) => {
        return {
          gesturesEnabled: false,
          title: "Sign Up",
          headerLeft: null,
          headerTitleStyle: { color: '#FFFFFF' },
          headerStyle: { backgroundColor: "#e6005c" },

        };
      };


    constructor(props){
        super(props)
      //  this.genders=["Female","Male","Others"],
        this.state = {
            date:'',
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            password:'',
            address:'',
            gender:''
        }
        this.signUp= this.signUp.bind(this);
      }

      genderList=()=>{
          return(this.genders.map((x,i)=>{
              return(<Picker.Item label={x} key={i} />)
          }));
      }

      signUp(){
        console.log(this.state.date,this.state.firstName,this.state.lastName,this.state.email,this.state.phone,this.state.password,this.state.address,this.state.gender,this.state.date);

        fetch('http://192.168.195.52:3000/users/sendotp', {
          method: 'POST',
          headers: {
                   'Content-Type': 'application/json'
                   },
          body: JSON.stringify(
          {phone:this.state.phone}
          )
        })
       .then(function(response){
        return response.json();
       })
       .then(function(data){
         this.props.navigation.navigate('Welcome');
         this.storeUserData(data.user)
       }.bind(this));


       }


      handleFirstname = (firstName:String)=>{
         this.setState({
             firstName:firstName
         })
     }
      handleLastname = (lastName:String)=>{
           this.setState({
               lastName:lastName
           })
       }
       handleEmail = (email:String)=>{
               this.setState({
                   email:email
               })
           }
       handleMobile = (phone:String)=>{
         this.setState({
             phone:phone
         })
     }
       handlePassword = (password:String)=>{
               this.setState({
                   password:password
               })
           }
           handleAddress = (address:String)=>{
             this.setState({
                 address:address
             })
         }
         handleGender = (gender) => {
               this.setState({ gender: gender })
            }




    render(){
        return (

<>

 <View style={styles.cont1}>

        <FormTextInput
           value={this.state.firstName}
           onChangeText={this.handleFirstname}
           placeholder='First Name'
       />
       <FormTextInput
          value={this.state.lastName}
          onChangeText={this.handleLastname}
          placeholder='Last Name'
       />
       <FormTextInput
         value={this.state.email}
         onChangeText={this.handleEmail}
         placeholder='Email'
       />
        <FormTextInput
            value={this.state.phone}
            onChangeText={this.handleMobile}
            placeholder='Mobile Number'
        />




        <FormTextInput
          value={this.state.address}
          onChangeText={this.handleAddress}
          placeholder='Address'
        />

          <FormTextInput
               value={this.state.gender}
               onChangeText={this.handleGender}
               placeholder='Gender'
            />
  <FormTextInput
                     value={this.state.password}
                     onChangeText={this.handlePassword}
                     placeholder='Password'
                  />


          <DatePicker
            style={{width: '80%'}}
            date={this.state.date}
            mode="date"
            placeholder="BOD"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
//              dateIcon: {
//                position: 'absolute',
//                left: 0,
//                top: 4,
//                marginLeft: 0
//              },
              dateInput: {
              marginTop:20,


              }
              // ... You can check the      source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />



          </View>
          <View style={styles.cont2}>

 <TouchableOpacity style={styles.buttonContainer} onPress={this.signUp}>
                        <Text style={styles.text}>Sign Up</Text>
                    </TouchableOpacity>



</View>
          </>
        )
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
  cont2:{
  flex:1,
  backgroundColor:'white',
   justifyContent: "center",
      alignItems:'center'
  },
  cont1:{

    margin:20,
    //backgroundColor:'white',
    justifyContent: "center",
          alignItems:'center'
    },
    loginButton:{
    margin:20
    },
    buttonContainer:{
         width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e6005c",
            bottom:0,
            position:'absolute',
           alignSelf:'flex-end',
            paddingVertical: 15,

            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "#e6005c"
        },
         text: {
            color: "white",
            textAlign: "center",
            height: 20
          }
});

export default Register;