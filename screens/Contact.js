import * as React from "react";
import { Image, StyleSheet, View,Text,Picker } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import {AsyncStorage} from 'react-native';
import FormTextInput from "../components/FormTextInput";
import Button from "../components/Button";

class Contact extends React.Component{
    constructor(props){
        super(props);
        this.reasons=["Package","Claim","Docs"],
        this.state={
            selectedReason:null,
           description:''
        }
        this.submitContact= this.submitContact.bind(this);
    }

    reasonList=()=>{
        return(this.reasons.map((x,i)=>{
            return(<Picker.Item label={x} key={i} />)
        }));
    }
     handleCommentChange = (comment:String)=>{
            this.setState({
                description:comment
            })
        }

        submitContact(){
        this.getUserData('user').then(
            (data)=>{
                fetch('http://192.168.195.52:3000/notification/addNotification', {
                      method: 'POST',
                      headers: {
                               'Content-Type': 'application/json'
                               },
                      body: JSON.stringify({contact: {description:this.state.description,regarding:this.state.selectedReason,userEmpId:this.state.userEmpId,
                      userId:this.state.userId,userrole:this.state.userrole}})
                    })
                   .then(function(response){
                    return response.json();
                   })
                   .then(function(data){
                     this.props.navigation.navigate('Welcome');
                   }.bind(this));
            })
        }


async getUserData(key){
        try {
            const retrievedItem =  await AsyncStorage.getItem(key);
            this.state.id = JSON.parse(retrievedItem).id;
            this.state.userEmpId=JSON.parse(retrievedItem).userEmpId;
            this.state.userrole = JSON.parse(retrievedItem).userrole;
        } catch (error) {
         console.log(error.message);
        }
    }

    render(){
        return (
        <>
            <View>
               <Picker
               selectedValue={this.state.selectedReason}
               onValueChange={(value)=>(this.setState({ selectedReason:value}))}
               >
               {this.reasonList()}
               </Picker>

               <FormTextInput
                   value={this.state.comment}
                   onChangeText={this.handleCommentChange}
                   placeholder='comment'
               />

               <Button label='contact' onPress={this.submitContact}/>

            </View>
        </>
        );
    }
}

export default Contact;