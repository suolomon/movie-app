import * as React from 'react';

import styles from './styles'
import categories from '../../assets/data/categories'
import { Text, View } from '../../components/Themed';
import HomeCategory from '../../components/HomeCategory';
import { FlatList } from 'react-native';

const HomeScreen = ()=> {
  return (
    <View style={styles.container}>
      {/* List of categories */} 
      <FlatList       
      data={categories.items} 
      renderItem={({item}) => <HomeCategory category={item}/>}
      />
    </View> 
  );
}


export default HomeScreen;