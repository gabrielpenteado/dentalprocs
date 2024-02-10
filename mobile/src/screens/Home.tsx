import { useState, useCallback } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";

import { FontAwesome5 } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { ProcedureDay, DaySize } from "../components/ProcedureDay";

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 366; // days to show on screen 52 * 7 or 18 * 7 or 21 * 7 or 24 * 7
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

type SummaryProps = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps | null>(null);

  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("/summary");
      setSummary(response.data);
      // console.log(response.data);
    } catch (error) {
      Alert.alert("Error", "Procedures summary could not be loaded.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DaySize }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {summary && (
          <View className="flex-row flex-wrap">
            {datesFromYearStart.map((date) => {
              const dayWithProcedures = summary.find((day) => {
                return dayjs(date).isSame(day.date, "day");
              });

              return (
                <ProcedureDay
                  key={date.toString()}
                  date={date}
                  amountOfProcedures={dayWithProcedures?.amount}
                  amountCompleted={dayWithProcedures?.completed}
                  onPress={() =>
                    navigate("procedure", { date: date.toISOString() })
                  }
                />

                // <ProcedureDay
                //   key={date.toString()}
                //   date={date}
                //   amountOfProcedures={4}
                //   amountCompleted={Math.round(Math.random() * 4)}
                // />
                // This return code is for populate all days and have a visual knowledge of the app.
              );
            })}

            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                <FontAwesome5
                  key={index}
                  name="tooth"
                  color={colors.zinc[900]}
                  size={DaySize + 7}
                  margin={3}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
