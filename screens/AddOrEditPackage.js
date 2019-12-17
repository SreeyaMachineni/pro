import * as React from "react";
import { Image, StyleSheet, View,Text,Picker } from "react-native";
import imageLogo from "../assets/images/logo.jpg";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import {AsyncStorage} from 'react-native';

import { AppRegistry,  FlatList,  Alert, ActivityIndicator, Platform} from 'react-native';


class AddOrEditPackage extends React.Component{

    constructor(props){
        super(props);
        selectedProviderName:'';
                   selectedProviderId:'';
        this.state={
isLoading: true,
            insurers:[],
            categories:[],
            packages:[],
           selectedCategoryName:'',
           selectedCategoryId:'',
           InsProviders:[],

           packages:[],
           selectedPackage:'',
           activeFrom:'',
           activeTo:''
        }
    }

    componentDidMount() {
      return fetch('http://192.168.195.52:3000/category/getCategoryList')
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                isLoading: false,
                categories: responseJson
              }, function() {
                   //todo
              });
            })
            .catch((error) => {
              console.error(error);
            });
     }


    async getUserData(key){
        try {
            const retrievedItem =  await AsyncStorage.getItem(key);
            this.state.id = JSON.parse(retrievedItem).id;
        } catch (error) {
         console.log(error.message);
        }
    }

getInsuranceProviders(){

  return fetch('http://192.168.195.52:3000/insurer/getInsuresList')
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                isLoading: false,
                insurers: responseJson
              }, function() {
                    //todo
              });
            })
            .catch((error) => {
              console.error(error);
            });
}

    setProvName =(itemVal)=>{
            let ins = this.state.insurers.find(insurer => insurer._id === itemVal)
            this.selectedProviderName = ins.name;
           this.getPackages(this.selectedProviderId);
    }

    getPackages(providerId){


    return fetch('http://192.168.195.52:3000/package/getPackagesByInsurer/'+providerId)
                .then((response) => response.json())
                .then((responseJson) => {
                  this.setState({
                    isLoading: false,
                    packages: responseJson
                  }, function() {
                        console.log(responseJson)
                  });
                })
                .catch((error) => {
                  console.error(error);
                });
    }



render() {

if (this.state.isLoading) {
     return (
       <View style={{flex: 1, paddingTop: 20}}>
         <ActivityIndicator />
       </View>
     );
   }
return (
      <View>
           <Picker
           selectedValue={this.state.selectedCategory}
           onValueChange={(itemVal,itemIndex) => {  this.setState({ isLoading:true,  selectedCategoryName:itemVal,selectedCategoryId:itemIndex}); this.getInsuranceProviders();  }}>
            {this.state.categories.map((item,key)=>(
                <Picker.Item label={item.name} value={item.name} key={item._id} />
            ))}
           </Picker>


           <Picker
              selectedValue={this.state.selectedProvider}
             onValueChange={(itemVal,itemIndex) => {  this.selectedProviderId=itemVal; this.setProvName(itemVal)   }  }>
               {this.state.insurers.map((item,key)=>(
                   <Picker.Item label={item.name} value={item._id} key={item._id} />
               ))}
          </Picker>




      </View>
      ) ;
}
}

const styles = StyleSheet.create({
    logoContainer:{
        alignItems:'center'
    },

    logo: {
        width:120,
        height:120,
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
        flex:1,
        backgroundColor:'white',
        justifyContent: "center",
        alignItems:'center'
    },
    cont1:{
        flex:2,
        backgroundColor:'white',
        justifyContent: "center",
        alignItems:'center'
    }
});

export default AddOrEditPackage

