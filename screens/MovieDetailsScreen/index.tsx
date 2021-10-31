import React, { useState } from 'react'
import {Text, View} from '../../components/Themed'
import styles from './styles'
import {Image, Pressable, FlatList} from 'react-native';
import  movie from '../../assets/data/movie'
import {MaterialIcons, Entypo, AntDesign, Feather, Ionicons, FontAwesome} from '@expo/vector-icons'
import EpisodeItem from '../../components/EpisodeItem';
import { Picker } from '@react-native-picker/picker';
import VideoPlayer from '../../components/VideoPlayer';


const firstEpisode = movie.seasons.items[0].episodes.items[0]
const firstSeason = movie.seasons.items[0]

const MovieDetailsScreen = ()=> {
    const [currentSeason, setCurrentSeason] = useState(firstSeason)
    const [currentEpisode, setCurrentEpisode] = useState(firstSeason.episodes.items[0])
    const seasonNames = movie.seasons.items.map(season => season.name)

    return (
        <View>
            <VideoPlayer episode={currentEpisode}/>
            
            <FlatList 
            data={currentSeason.episodes.items} 
            renderItem={({item}) => <EpisodeItem 
            episode={item} 
            onPress={setCurrentEpisode}
            />}
            style={{marginBottom: 200}}
            ListHeaderComponent={(
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
        <Picker
            style={{color: 'white', width: 130, marginTop: 5}}
            dropdownIconColor={'white'}
            selectedValue={currentSeason.name}
            onValueChange={(itemValue, itemIndex) =>{
                setCurrentSeason(movie.seasons.items[itemIndex])
            }}>
                {seasonNames.map(seasonName => (
                    <Picker.Item label={seasonName} value={seasonName} key={seasonName}/>
                ))}
        </Picker>

            </View>
            )}
            />
        </View>
        
    )
}

export default MovieDetailsScreen
