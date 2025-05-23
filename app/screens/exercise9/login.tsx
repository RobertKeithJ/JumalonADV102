import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/config'; 
import { router } from 'expo-router';

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

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("Signed in user:", userCredential.user);
      router.replace("/screens/welcome" as any); 
    } catch (error: any) {
      console.log("Firebase error:", error.message);
      alert("Login failed: " + error.message);
    }
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
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity style={style.button1} onPress={handleSubmit(onSubmit)}>
            <Text style={style.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.button2}
            onPress={() => router.push("screens/exercise9/register" as any)}
          >
            <Text style={style.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
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
