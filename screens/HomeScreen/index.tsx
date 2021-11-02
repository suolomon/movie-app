import React, {useEffect, useState} from 'react';
import styles from './styles'
import {DataStore} from 'aws-amplify'
// import categories from '../../assets/data/categories'
import { Text, View } from '../../components/Themed';
import HomeCategory from '../../components/HomeCategory';
import { FlatList } from 'react-native';
import {Category} from '../../src/models'

const HomeScreen = ()=> {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await DataStore.query(Category))
    }
    fetchCategories();
    },[])
  return (
    <View style={styles.container}>
      {/* List of categories */} 
      <FlatList       
      data={categories} 
      renderItem={({item}) => <HomeCategory category={item}/>}
      />
    </View> 
  );
}


export default HomeScreen;