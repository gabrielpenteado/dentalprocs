import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

export function ProceduresEmpty() {
  const { navigate } = useNavigation();
  return (
    <View>
      <Text className="text-zinc-400 text-base">
        No procedures found.
      </Text>
      <Text
        className="text-teal-400 text-base underline active:text-teal-500"
        onPress={() => navigate('new')}
      >
        Start by creating a procedure.
      </Text>
    </View>
  )
}