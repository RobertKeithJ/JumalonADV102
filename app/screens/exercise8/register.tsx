import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterScreen() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1000));

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setIsLoading(false);
  };

  const onSubmit = (data: FormData) => {
    if (!image) {
      alert("Please select an image!");
      return;
    }

    console.log("Registration Successful:", { ...data, image });
    reset(); // clears form fields
    setImage(null);
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Register</Text>

      <Text style={{ textAlign: "center", marginVertical: 20 }}>
        {image ? (
          <Image source={{ uri: image }} style={style.image} />
        ) : (
          <View style={style.imagePlacholder} />
        )}
      </Text>

      <TouchableOpacity style={style.button1} onPress={pickImage}>
        <Text style={style.buttonText}>{isLoading ? "Loading..." : "Upload an image"}</Text>
      </TouchableOpacity>

      {/* Name Field */}
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={style.textInput}
            label="Name"
            mode="outlined"
            placeholder="Enter your name..."
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={style.error}>{errors.name.message}</Text>}

      {/* Email Field */}
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
            style={style.textInput}
            label="Email"
            mode="outlined"
            placeholder="Enter your email..."
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={style.error}>{errors.email.message}</Text>}

      {/* Password Field */}
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
            style={style.textInput}
            label="Password"
            mode="outlined"
            placeholder="Enter your password..."
            secureTextEntry
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={style.error}>{errors.password.message}</Text>}

      <TouchableOpacity style={style.button1} onPress={handleSubmit(onSubmit)}>
        <Text style={style.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingHorizontal: 35,
    gap: 8,
  },
  textInput: {
    width: 500,
    alignSelf: "center",
    fontSize: 18,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 35,
    fontFamily: "sans-serif",
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  button1: {
    borderColor: "red",
    backgroundColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 4,
    padding: 4,
    width: 500,
    fontSize: 25,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "sans-serif",
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  image: {
    width: 200,
    height: 150,
    borderWidth: 0.5,
    borderColor: "red",
  },
  imagePlacholder: {
    width: 200,
    height: 150,
    borderWidth: 0.5,
    borderColor: "red",
  },
  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
});
