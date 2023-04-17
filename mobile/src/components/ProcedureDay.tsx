import { TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

const weekDays = 7;
const screenH_padding = (32 * 2) / 5;

export const DayMarginBetween = 8;
export const DaySize = (Dimensions.get('screen').width / weekDays) - (screenH_padding + 5);

export function ProcedureDay() {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
    >
      <FontAwesome5
        name="tooth"
        color={colors.zinc[700]}
        size={DaySize + 7}
        margin={3}
      />
    </TouchableOpacity>
  )
}