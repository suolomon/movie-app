import Storage from '@aws-amplify/storage';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import { Pressable, Image } from 'react-native'
import { Movie } from "../../src/models";
import styles from "./styles";


const MovieItem = ({movie}: {movie: Movie}) => {
     const navigation = useNavigation();
     const [imageUrl, setImageUrl] = useState('');
    const onMoviePress = () => {
      navigation.navigate('MovieDetailsScreen', { id: movie.id})
    }

    useEffect(() => {
        if (movie.poster.startsWith('http')){
            setImageUrl(movie.poster)
            return;
        }
        Storage.get(movie.poster) // for listing ALL files without prefix, pass '' instead
        .then(setImageUrl)
    }, [])
    return (
       <Pressable onPress={onMoviePress}>

            <Image style={styles.image} source={{ uri: imageUrl }} />
          </Pressable>
    )
}

export default MovieItem
