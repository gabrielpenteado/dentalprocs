import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from "clsx";
import dayjs from "dayjs";

const weekDays = 7;
const screenH_padding = (32 * 2) / 5;

export const DayMarginBetween = 8;
export const DaySize = (Dimensions.get('screen').width / weekDays) - (screenH_padding + 5);

interface Props extends TouchableOpacityProps {
  amountOfProcedures?: number;
  amountCompleted?: number;
  date: Date;
};

export function ProcedureDay({ amountOfProcedures = 0, amountCompleted = 0, date, ...rest }: Props) {

  const amountAccomplishedPercentage = amountOfProcedures > 0 ? generateProgressPercentage(amountOfProcedures, amountCompleted) : 0;
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...rest}

    >
      <FontAwesome5
        name="tooth"
        color={clsx('', {
          '#fafafa': isCurrentDay && amountAccomplishedPercentage == 0,
          '#27272A': !isCurrentDay && amountAccomplishedPercentage == 0,
          '#03302d': amountAccomplishedPercentage > 0 && amountAccomplishedPercentage < 20,
          '#065f5b': amountAccomplishedPercentage >= 20 && amountAccomplishedPercentage < 40,
          '#088f88': amountAccomplishedPercentage >= 40 && amountAccomplishedPercentage < 60,
          '#0bbeb6': amountAccomplishedPercentage >= 60 && amountAccomplishedPercentage < 80,
          '#0eeee3': amountAccomplishedPercentage >= 80
        })}
        size={DaySize + 7}
        margin={3}
      />
    </TouchableOpacity>
  );
}