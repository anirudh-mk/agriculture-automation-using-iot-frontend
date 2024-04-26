import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import DetailsCard from '../components/DetailsCard'
import GraphCard from '../components/GraphCard'

const FarmScreen = ({ route }) => {
  const { farmId, farmName, vegetableName, timeRequired } = route.params;
  const [npkData, setNpkData] = useState([]);
  const prevNpkData = useRef([]);


  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [90, 35, 34, 80, 99, 43, 54, 1, 12, 3, 123, 3, 2, 4, 4, 4, 24, 234, 324, 3, 24, 34, 34, 34, 342, 234, 3, 34, 34, 34, 34, 34, 343, 434, 340, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(43, 105, 198, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: [46, 67, 78, 43, 87, 43, 86],
        color: (opacity = 1) => `rgba(108, 82, 184, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: [46, 67, 78, 43, 87, 43, 86],
        color: (opacity = 1) => `rgba(10, 82, 184, ${opacity})`,
        strokeWidth: 2
      }

    ]
  };

  const n = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [90, 35, 34, 80, 99, 43, 54, 1, 12, 3, 123, 3, 2, 4, 4, 4, 24, 234, 324, 3, 24, 34, 34, 34, 342, 234, 3, 34, 34, 34, 34, 34, 343, 434, 340, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(43, 105, 198, ${opacity})`,
        strokeWidth: 2
      },
    ]
  };

  const p = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [46, 67, 78, 43, 87, 43, 86],
        color: (opacity = 1) => `rgba(108, 82, 184, ${opacity})`,
        strokeWidth: 2
      },
    ]
  };


  const k = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [46, 67, 78, 43, 87, 43, 86],
        color: (opacity = 1) => `rgba(10, 82, 184, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  useEffect(() => {
    // Fetch NPK data from the API
    const fetchNpkData = async () => {
      try {
        const response = await fetch('http://anirudhmk123.pythonanywhere.com/api/v1/npk/get/e1d3282a-2743-447a-859e-a2b583b8ac34/');
        const data = await response.json();
        if (data && data.response) {
          setNpkData(data.response);
        }
      } catch (error) {
        console.error('Error fetching NPK data:', error);
      }
    };

    const intervalId = setInterval(fetchNpkData, 1000); // Fetch data every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    // Check if npkData has changed
    if (JSON.stringify(npkData) !== JSON.stringify(prevNpkData.current)) {
      prevNpkData.current = npkData; // Update prevNpkData
      // Trigger reload by changing the state variable
      setDataChanged(!dataChanged);
    }
  }, [npkData]);

  const [dataChanged, setDataChanged] = useState(false);

  const handleDataChange = () => {
    // Trigger reload by changing the state variable
    setDataChanged(!dataChanged);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headdingContainer}>
        <Text style={styles.headdingText}>{farmName}</Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.deailsCardContainer}>
          <DetailsCard
            vegetableName={vegetableName}
            timeRequired={timeRequired}
            n={npkData.length > 0 ? npkData[0].n : ''}
            p={npkData.length > 0 ? npkData[0].p : ''}
            k={npkData.length > 0 ? npkData[0].k : ''}
          />
        </View>
        <Text style={styles.subHeadding}>Live Data</Text>
        <View style={styles.deailsCardContainer}>
          <GraphCard
            vegetableName={vegetableName}
            navigation={true}
            data={data}
            n={n}
            p={p}
            k={k}
          />
        </View>
        {/* <Text style={styles.subHeadding}>Market Prediction</Text>
        <View style={styles.deailsCardContainer}>
          <GraphCard
            vegetableName={vegetableName}
          />
        </View> */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 28,
    backgroundColor: 'white'
  },
  headdingContainer: {
    paddingLeft: 16,
    paddingVertical: 10
  },
  headdingText: {
    fontSize: 28,
    fontWeight: "600",
  },
  scrollViewContainer: {
    flex: 1
  },
  subHeadding: {
    paddingLeft: 16,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: '600'
  },
  deailsCardContainer: {
    alignItems: 'center',
    padding: 16
  },
})

export default FarmScreen
