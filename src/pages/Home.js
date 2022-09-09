import React, {useState} from "react";
import {
        View,
        Text,
        TextInput,
        StyleSheet,
        Platform,
        FlatList
    } from "react-native";

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

export function Home () {
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState([]);

    function handleAddNewSkill () {
        setMySkills(oldStateSkills => [...oldStateSkills, newSkill]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, React Native</Text>
            <TextInput 
                style={styles.input}
                placeholder="New Skill"
                placeholderTextColor={"#555"}
                onChangeText={setNewSkill}
            />
            <Button onPress={handleAddNewSkill}/>

            <Text style={[styles.title, {marginVertical: 50}]}>
                My Skills
            </Text>

            <FlatList
                data={mySkills}
                keyExtractor={item => item}
                renderItem={ ({item}) => (
                    <SkillCard skill={item}/>
                ) }
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121015",
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 70,
    },
    title: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: "bold"
    },
    input: {
        backgroundColor: "#1F1e25",
        color: "#FFF",
        fontSize: 18,
        padding: (Platform.OS === "ios")? 15 : 10, // Aumentar tamanho interno
        marginTop: 30, // Espaço do componente em relação ao outro
        borderRadius: 5
    }
});