import React, {useState, useEffect}from "react";

import styles from "./styles";
import { Image, FlatList, Pressable } from "react-native";
import { Text} from "../Themed";
import { Category, Movie } from "../../src/models";
import { DataStore } from "@aws-amplify/datastore";
import {Storage} from 'aws-amplify';
import MovieItem from "../MovieItem";


interface HomeCategoryProps {
    category: Category, 
    
}
const HomeCategory = (props: HomeCategoryProps) => {
    const { category } = props;
    
    const [movies, setMovies] = useState<Movie[]>([]);

   
    
    useEffect(() => {
     const fetchMovies = async () => {
       const result = (await DataStore.query(Movie))
                              .filter((movie)=> movie.categoryID === category.id)
        console.log(result)
        setMovies(result)
     }
     fetchMovies();

    },[])

 

  

  return (
    <>
      <Text style={styles.title}>{category.title}</Text>

      <FlatList
        data={movies}
        renderItem={({ item }) => (<MovieItem movie={item}/>)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default HomeCategory;
