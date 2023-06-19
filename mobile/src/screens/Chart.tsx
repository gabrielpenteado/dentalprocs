import { useCallback, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { api } from "../lib/axios";
import { VictoryPie, VictoryTheme, VictoryTooltip, VictoryLegend, VictoryLabel } from "victory-native";

import { BackButton } from "../components/BackButton";
import { Loading } from "../components/Loading";
import { color } from "react-native-reanimated";


type procsChart = {
  title: string;
  total: number
}[]

type legendTitle = {
  title: string;
}

type proceduresTotal = {
  total: number;
}

export function Chart() {
  const [loading, setLoading] = useState(true);
  const [procsChart, setProcsChart] = useState<procsChart>([]);
  const [legendTitles, setLegendTitles] = useState([]);
  const [procsTotal, setProcsTotal] = useState<number[]>([]);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get('/chart')
      // console.log(response.data);
      setProcsChart(response.data);

      const legendTitlesArray = response.data.map((proc: legendTitle) => proc.title)
      // console.log(legendTitlesArray);
      setLegendTitles(legendTitlesArray);

      const totalProcsArray = response.data.map((proc: proceduresTotal) => proc.total)
      // console.log(totalProcsArray);

      // Convert array of strings to array of numbers
      const totalProcsNumbersArray = totalProcsArray.map((proc: string) => parseInt(proc))
      // console.log(totalProcsNumbersArray)

      setProcsTotal(totalProcsNumbersArray);

    } catch (error) {
      Alert.alert('Error', 'Procedures chart could not be loaded.');
      console.log(error);

    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData();
  }, []));

  if (loading) {
    return (
      <Loading />
    )
  }

  // Calculate sum of total procedures 
  const totalOfProcedures = procsTotal.reduce((accumulator: number, currentValue: number) => {
    return accumulator + currentValue;
  });
  // console.log(totalOfProcedures);

  // Calculate percentage of each procedure
  const percentageProcs = procsTotal.map((proc: number) => (proc / totalOfProcedures * 100).toFixed(0) + '%')
  // console.log(percentageProcs);

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Procedures Chart
        </Text>


        <View className="flex-1 items-center justify-center w-full">
          <VictoryPie
            theme={VictoryTheme.material}
            data={procsChart}
            x="title"
            y="total"
            padAngle={3}
            colorScale={"cool"}
            radius={100}
            innerRadius={50}
            height={280}
            labels={percentageProcs}
            labelRadius={110}
            // labels={() => ''}
            style={{
              labels: {
                fill: "white",
                fontSize: "12px"
              }
            }}
          // labelComponent={
          //   <VictoryTooltip
          //     renderInPortal={false}
          //     flyoutStyle={{
          //       stroke: 1,
          //       fill: "#09090A"
          //     }}
          //   />
          // }
          />

          <VictoryLegend
            colorScale={"cool"}
            x={130}
            y={0}
            gutter={20}
            centerTitle
            style={{
              border: { stroke: "#09090A" },
            }}
            // data={[{ name: 'aaaaa' }, { name: 'bbbbb' }, { name: 'ccccc' }, { name: 'ddddd' }]}
            data={legendTitles.map((title) => ({ name: title, labels: { fill: "white" } }))}
          />
        </View>



        {/* <View className="flex-1 bg-background px-8 pt-16">
          {
            procsChart.map((proc, index) => (
              <View key={`${proc}-${index}`}>
                <Text
                  className="text-zinc-400 text-xl font-bold text-center mx-1"
                >
                  {proc.title} = {proc.total}
                </Text>
              </View>
            ))
          }
        </View> */}

      </ScrollView >
    </View>
  )
}