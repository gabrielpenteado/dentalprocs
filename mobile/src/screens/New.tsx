import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";

import { Checkbox } from "../components/Checkbox";
import { useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday'];

export function New() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewProcedure() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        Alert.alert('New Procedure', 'Type a new procedure and select at least one day.')
      }
      await api.post('/procedures', { title, weekDays });

      setTitle('');
      setWeekDays([]);

      Alert.alert('Success!', 'New procedure created!')

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not create a new procedure.')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Create Procedure
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Which is your new procedure?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800
           focus:border-teal-500"
          placeholder="Fillings, Root canal, etc..."
          placeholderTextColor={colors.zinc[500]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Which is the recurrence?
        </Text>

        {
          availableWeekDays.map((weekDay, index) => (
            <Checkbox
              key={weekDay}
              title={weekDay}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />
          ))
        }

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-teal-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateNewProcedure}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="font-semibold text-base text-white ml-2">
            Confirm
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}