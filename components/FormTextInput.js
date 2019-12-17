import * as React from "react"
import {StyleSheet,Text,TextInputProps,TextInput} from "react-native"


class FormTextInput extends React.Component{
    render(){
        const {style,...otherProps} =   this.props;
        return (
            <TextInput
                selectionColor='powderblue'
                style={{height: 40, borderColor: 'gray',borderBottomWidth:1,width:300}}
                {...otherProps}
            />
        );
    }
}
const styles = StyleSheet.create({
    textInput:{
        height: 40,
        borderColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20
    }
});

export default FormTextInput;