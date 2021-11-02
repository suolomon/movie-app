import React, {useState, useEffect}from "react";

import styles from "./styles";
import { Image, FlatList, Pressable } from "react-native";
import {useNavigation} from '@react-navigation/native'
import { Text} from "../Themed";
import { Category, Movie } from "../../src/models";
import { DataStore } from "@aws-amplify/datastore";


interface HomeCategoryProps {
    category: Category, 
    
}
const HomeCategory = (props: HomeCategoryProps) => {
    const { category } = props;
    
    const [movies, setMovies] = useState<Movie[]>([]);

    const navigation = useNavigation();
    
    useEffect(() => {
     const fetchMovies = async () => {
       const result = (await DataStore.query(Movie))
                              .filter((movie)=> movie.categoryID === category.id)
        console.log(result)
        setMovies(result)
     }
     fetchMovies();

    },[])

    const onMoviePress = (movie: Movie) => {
      navigation.navigate('MovieDetailsScreen', { id: movie.id})
    }
  return (
    <>
      <Text style={styles.title}>{category.title}</Text>

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <Pressable onPress={() => onMoviePress(item)}>

            <Image style={styles.image} source={{ uri: item.poster }} />
          </Pressable>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default HomeCategory;
