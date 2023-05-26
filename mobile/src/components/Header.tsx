import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/logo.svg';

export function Header() {
  const { navigate } = useNavigation();

  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />

      <View className="gap-3">

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row h-14 px-4 border border-teal-500 rounded-lg items-center"
          onPress={() => navigate('new')}
        >
          <Feather
            name="plus"
            color={colors.teal[400]}
            size={20}
          />

          <Text className="text-white ml-3 font-semibold text-base">
            New{'\n'}Procedure
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row h-14 px-4 border border-teal-500 rounded-lg items-center"
          onPress={() => navigate('chart')}
        >
          <Feather
            name="pie-chart"
            color={colors.teal[400]}
            size={20}
          />

          <Text className="text-white ml-3 font-semibold text-base">
            Chart
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}