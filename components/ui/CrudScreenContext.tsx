import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ToggleButton } from "./ThemeToggle";
import { useTheme } from "./BackgroundTheme";
import { TextInput } from "react-native-paper";
import React, { useReducer, useState } from "react";
import { taskBtns } from "@/app/utils/hooksButtons";
import { AntDesign } from "@expo/vector-icons";

function reducer(state: any, action: any){
    switch(action.type){
        case "add":
            return [...state, action.payload];
        case "edit":
            return state.map((task: string, index: number) => index === action.payload.index ? action.payload.newTaskk : task);
        case "remove":
            return state.filter(( _ : any, index: number) => index !== action.payload.toRemoveIndex);
    }
}

export function CrudScreenContent() {
    const {theme} = useTheme();
    const [task, setTask] = useState("");
    const [tasks, dispatch] = useReducer(reducer, []);
    const [newTask, setNewTask] = useState("");
    const [editIsClicked, setIsEditClicked] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddTask = (addNewTask: string) => {
        if(task.trim() !== ""){
            dispatch({type: "add", payload: addNewTask});
            setTask("");
        }
    }

    const handleSaveNewTask = (NewTask: any, Index: number) => {
        setIsEditClicked(true);
        setEditingIndex(Index);
        if(NewTask.trim() !== ""){
            dispatch({type: "edit", payload: { index: Index, newTaskk: NewTask}});
            setIsEditClicked(false);
            setEditingIndex(null);
            setNewTask("");
        }
    }

    const handleRemoveTask = (Task: any, Index: number) => {
        dispatch({type: "remove", payload: {toRemoveIndex: Index}});
        setEditingIndex(null);
        setIsEditClicked(false);
    }

    return (
        <View style={{
            backgroundColor: theme.bgColor,  
            padding: 20,
            flex: 1, 
            transitionDuration: theme.transition
        }}>
            {/* navlists */}
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                
                <ToggleButton />
            </View>
        
            {/* hero contents */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{
                    padding: 20,
                    borderRadius: 10,
                    marginTop: 50,
                    gap: 30,
                    borderColor: theme.fontColor,
                    borderStyle: "solid",
                    borderWidth: 2,
                    backgroundColor: "red" // Set task list background to red
                }}>
                    
                    <Text style={{
                    fontSize: 23,
                    fontFamily: "sans-serif",
                    color: theme.fontColor,
                    transitionDuration: theme.transition,
                    fontWeight: "bold",
                    paddingRight: 20,
                    alignSelf: "center" 
                }}>To Do List</Text>
                
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 20
                    }}>
                        <TextInput
                            style={{ flex: 1}}
                            value={task}
                            placeholder="Input Task Here"
                            mode="outlined"
                            onChangeText={value => setTask(value)}
                            activeOutlineColor={task.trim() === "" ? "red" : "green"}
                        />
                        <TouchableOpacity 
                            onPress={() => handleAddTask(task)}
                            style={{
                                borderStyle: "solid",
                                borderWidth: 2,
                                borderColor: theme.fontColor,
                                padding: 16.5,
                                borderRadius: 4
                            }}
                            disabled={task.trim() === ""}>
                            <Text style={{ color: theme.fontColor, fontWeight: "bold" }}>Add Task</Text>
                        </TouchableOpacity>
                    </View>
        
                    {/* Tasks List */}
                    {tasks.map((task: any, index: any) => (
                        <View
                            key={index} 
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderStyle: "solid",
                                borderWidth: 2,
                                borderColor: theme.fontColor,
                                padding: 12,
                                paddingHorizontal: 30,
                                borderRadius: 4,
                            }}>
                            {editIsClicked && editingIndex === index ? (
                                <TextInput
                                    style={{ height: 45, width: "60%", padding: 2 }}
                                    placeholder="Type a task"
                                    mode="outlined"
                                    value={newTask}
                                    onChangeText={value => setNewTask(value)}
                                    activeOutlineColor={newTask.trim() === "" ? "red" : "green"}
                                />
                            ) : <Text style={{ color: theme.fontColor, fontSize: 24, fontWeight: 500}}>{task}</Text>}
                         
                            <View style={{flexDirection: "row", gap: 5}}> 
                            {taskBtns(theme.fontColor).map((btn, _) => (
                                <TouchableOpacity
                                    onPress={() => btn.name === "Edit" ? handleSaveNewTask(newTask, index) : handleRemoveTask(task, index)}
                                    key={btn.id} 
                                    disabled={
                                        editIsClicked &&
                                        editingIndex === index &&
                                        btn.name === "Edit" &&
                                        newTask.trim() === ""}
                                        style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: 45,  
                                    }}>
                                    <Text style={{ color: theme.fontColor }}>
                                        {editIsClicked && 
                                         editingIndex === index &&
                                         btn.name === "Edit" ? <AntDesign name="save" color={theme.fontColor} size={35}/> : btn.icon}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            </View>

                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>        
    );
}
