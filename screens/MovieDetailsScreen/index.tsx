import React from 'react'
import {Text, View} from '../../components/Themed'
import styles from './styles'
import {Image, Pressable} from 'react-native';
import  movie from '../../assets/data/movie'
import {MaterialIcons, Entypo, AntDesign, Feather, Ionicons, FontAwesome} from '@expo/vector-icons'


const firstEpisode = movie.seasons.items[0].episodes.items[0]

const MovieDetailsScreen = ()=> {
    return (
        <View>
            <Image style={styles.image}source={{uri: firstEpisode.poster}}/>
            <View style={{padding: 12}}>

            <Text style={styles.title}>{movie.title}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.match}>98% match</Text>
                <Text style={styles.year}>{movie.year}</Text>
                <View style={styles.ageContainer}>
                    <Text style={styles.age}>12+</Text>
                </View>
                <Text style={styles.year}>{movie.numberOfSeasons} seasons</Text>
                <MaterialIcons name="hd" size={24} color="white"/>
            </View>

            {/* play button */}
            <Pressable onPress={()=>{console.warn('Plage')}} style={styles.playButton}>
                <Text style={styles.playButtonText}>
                <Entypo name="controller-play" size={24} color="black"/>
                Play
                </Text>
            </Pressable>

            {/* download button */}
            <Pressable onPress={()=>{console.warn('Plage')}} style={styles.downloadButton}>
                <Text style={styles.downloadButtonText}>
                <AntDesign name="download" size={16} color="white"/>
                {' '}
                 Download
                </Text>
            </Pressable>

        <Text style={{marginVertical: 10}}>{movie.plot}</Text>
        <Text style={styles.year}>Cast: {movie.cast}</Text>
        <Text style={styles.year}>Creator: {movie.creator}</Text>

        {/* Row icon buttons */}
        <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{alignItems: 'center', marginHorizontal: 20}}>
               <AntDesign name="plus" size={24} color={"white"}/>
               <Text style={{color:'darkgrey', marginTop: 5}}>My List</Text>
            </View>
            <View style={{alignItems: 'center', marginHorizontal: 20}}>
               <Feather name="thumbs-up" size={24} color="white"/>
               <Text style={{color:'darkgrey', marginTop: 5}}>Rate</Text>
            </View>
            <View style={{alignItems: 'center', marginHorizontal: 20}}>
               <FontAwesome name="send-o" size={24} color={"white"}/>
               <Text style={{color:'darkgrey', marginTop: 5}}>Share</Text>
            </View>
        </View>
            </View>
        </View>
    )
}

export default MovieDetailsScreen
