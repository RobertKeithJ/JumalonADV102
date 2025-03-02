;
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const inputs = [
        {
            label: "Email..",
            placeholder: "Enter email",
            value: email,
            onChange: setEmail,
        },

        {
            label: "Password..",
            placeholder: "Enter password",
            value: password,
            onChange: setPassword,
            secure: true
        }
    ]

 return (
    <View style={style.container}>
        <View style={style.container1}>
        <Text style={style.title}>Login</Text>
        {inputs.map((input, i) =>(
            <TextInput 
                key={i}
                style={  i === 0 ? {
                        marginTop: 35,
                        marginBottom: 4, 
                } : null}
                label={input.label}
                placeholder={input.placeholder}
                mode="outlined"
                value={input.value}
                onChangeText={input.onChange}
                secureTextEntry={input.secure}
            />
        ))}
      
        <TouchableOpacity style={style.button1}>
        <Text style={style.buttonText}>Log In</Text>
        </TouchableOpacity>
     
        <TouchableOpacity style={style.button2}>
        <Text style={style.buttonText}>Register</Text>
        </TouchableOpacity>

        </View>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 35,
        backgroundColor: "black"
    },
    container1: {
        padding: 20,
        width: 800,
        height: 500,
        alignSelf:"center",
        
    },
    title: {
        fontSize: 35,
        fontFamily: "sans-serif",
        color: 'red',
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 170,
    },
    button1: {
        borderColor: 'red',
        borderStyle: "solid",
        borderWidth: 2,
        marginTop: 15,
        borderRadius: 4,
        padding: 4
    },
    button2: {
        borderColor: 'red',
        borderStyle: "solid",
        borderWidth: 2,
        marginTop: 15,
        borderRadius: 4,
        padding: 4
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "sans-serif",
        color: 'white',
        backgroundColor:'red',
        fontWeight: "bold",
        textAlign: "center",
        padding: 5,
    },
})