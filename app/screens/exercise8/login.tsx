import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Successfully logged in:', data);
  };

  return (
    <View style={style.container}>
      <View style={style.container1}>
        <Text style={style.title}>Login</Text>

        {/* Email Input */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email format"
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email.."
              placeholder="Enter email"
              mode="outlined"
              style={{ marginTop: 35, marginBottom: 4 }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text style={style.error}>{errors.email.message}</Text>}

        {/* Password Input */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password.."
              placeholder="Enter password"
              mode="outlined"
              style={{ marginTop: 10 }}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Text style={style.error}>{errors.password.message}</Text>}

        {/* Buttons */}
        <TouchableOpacity style={style.button1} onPress={handleSubmit(onSubmit)}>
          <Text style={style.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.button2}>
          <Text style={style.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    alignSelf: "center",
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
    backgroundColor: 'red',
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    alignSelf: "center",
  }
});
