import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Categories from '@/Components/Categories'
import { SafeAreaView } from 'react-native-safe-area-context'
import Restaurants from '@/Components/Restaurants'
import Colors from '@/constants/Colors'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{
        paddingBottom: 100
      }}>
        <Categories />

        <Text style={styles.header}>Top picks in your neighbourhood</Text>

        <Restaurants />

        <Text style={styles.header}>Offers near you</Text>

        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    top: 70,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 16,
    paddingHorizontal: 16
  }
})

export default Home