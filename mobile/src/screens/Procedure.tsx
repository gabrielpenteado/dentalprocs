import { useState, useEffect } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import clsx from "clsx";

import { api } from "../lib/axios";
import { generateProgressPercentage } from '../utils/generate-progress-percentage';

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { ProceduresEmpty } from "../components/ProceduresEmpty";

interface Params {
  date: string;
}

interface DayInfoProps {
  completeProcedures: string[];
  possibleProcedures: {
    id: string;
    title: string;
  }[];
}

export function Procedure() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedProcedures, setCompletedProcedures] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const proceduresProgress = dayInfo?.possibleProcedures.length
    ? generateProgressPercentage(dayInfo.possibleProcedures.length, completedProcedures.length)
    : 0;

  async function fetchProcedures() {
    try {
      setLoading(true);

      const response = await api.get('/day', { params: { date } });
      // console.log(response.data);
      setDayInfo(response.data);
      setCompletedProcedures(response.data.completedProcedures);

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not load procedures info.')
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleProcedure(procedureId: string) {
    try {
      await api.patch(`/procedures/${procedureId}/toggle`);

      if (completedProcedures.includes(procedureId)) {
        setCompletedProcedures(prevState => prevState.filter(procedure => procedure !== procedureId));
      } else {
        setCompletedProcedures(prevState => [...prevState, procedureId]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not update procedure status.')

    }
  }

  useEffect(() => {
    fetchProcedures();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={proceduresProgress} />

        <View className={clsx("mt-6", {
          ["opacity-60"]: isDateInPast
        })}>
          {
            dayInfo?.possibleProcedures ?
              dayInfo.possibleProcedures.map(procedure =>
                <Checkbox
                  key={procedure.id}
                  title={procedure.title}
                  disabled={isDateInPast}
                  onPress={() => handleToggleProcedure(procedure.id)}
                  checked={completedProcedures.includes(procedure.id)}
                />
              )
              : <ProceduresEmpty />
          }

        </View>
        {
          isDateInPast && (
            <Text className="text-white mt-10 text-center">
              It's not possible to edit procedures in past days.
            </Text>
          )
        }

      </ScrollView>
    </View>
  )
}