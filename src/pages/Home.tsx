import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  FlatList
} from 'react-native'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface SkillData {
  id: string
  name: string
}

export function Home() {
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState<SkillData[]>([])
  const [greetings, setGreetings] = useState('')

  useEffect(() => {
    const currentHour = new Date().getHours()

    if (currentHour < 12) {
      setGreetings('Good Morning')
    
    }  else if(currentHour >= 12 && currentHour <= 18) {
      setGreetings('Good Afternoon')
    
    } else {
      setGreetings('Good Night')
    }

  })

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getSeconds()),
      name: newSkill
    }
    setMySkills(oldStateSkills => [...oldStateSkills, data])
  }

  function handleRemoveSkill (id : string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id!==id
    ))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, React Native</Text>
      <Text style={styles.greetings}>
        {greetings}!
      </Text>

      <TextInput
        style={styles.input}
        placeholder='New Skill'
        placeholderTextColor={'#555'}
        onChangeText={setNewSkill}
      />
      <Button
        title="Add"
        activeOpacity={.7} 
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard 
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121015',
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1e25',
    color: '#FFF',
    fontSize: 18,
    padding: (Platform.OS === 'ios') ? 15 : 10, // Aumentar tamanho interno
    marginTop: 30, // Espaço do componente em relação ao outro
    borderRadius: 5
  },
  greetings: {
    color: '#FFF'
  }
})