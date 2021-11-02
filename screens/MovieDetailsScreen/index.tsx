import React, { useState, useEffect } from 'react'
import {Text, View} from '../../components/Themed'
import styles from './styles'
import {Image, Pressable, FlatList, ActivityIndicator} from 'react-native';
import {DataStore} from 'aws-amplify'
import { Movie, Season, Episode } from '../../src/models';
import  movie from '../../assets/data/movie'
import {useRoute} from '@react-navigation/native'
import {MaterialIcons, Entypo, AntDesign, Feather, FontAwesome} from '@expo/vector-icons'
import EpisodeItem from '../../components/EpisodeItem';
import { Picker } from '@react-native-picker/picker';
import VideoPlayer from '../../components/VideoPlayer';


const firstEpisode = movie.seasons.items[0].episodes.items[0]
const firstSeason = movie.seasons.items[0]

const MovieDetailsScreen = ()=> {
    const [movie, setMovie] = useState<Movie|undefined>(undefined)
    const [seasons, setSeasons] = useState<Season[]>([])
    const [episodes, setEpisodes] = useState<Episode[]>([])
    const [currentSeason, setCurrentSeason] = useState<Season|undefined>(undefined)
    const [currentEpisode, setCurrentEpisode] = useState<Episode|undefined>(undefined)
    const seasonNames = seasons ? seasons.map(season => season.name): []

    const route = useRoute()

    useEffect(() => {
     const fetchMovie = async () => {
        setMovie(await DataStore.query(Movie, route?.params?.id))
     }
     fetchMovie();
    }, [])


    useEffect(()=> {
        if(!movie) {
                return;
            }
        const fetchSeasons = async () => {
            const movieSeasons = (await DataStore.query(Season)).filter(season => season.movie?.id === movie.id)
            setSeasons(movieSeasons)
            setCurrentSeason(movieSeasons[0])
        }
        fetchSeasons();
    },[movie])

    
    useEffect(() => {
        if(!currentSeason) {
            return;
        }
        const fetchEpisodes = async () => {
            const seasonEpisodes = (await DataStore.query(Episode))
            .filter( episode => episode?.season?.id === currentSeason?.id);
            setEpisodes(seasonEpisodes);
            setCurrentEpisode(seasonEpisodes[0])
        }
        fetchEpisodes();
    }, [currentSeason])
    
    if(!movie) {
        return<ActivityIndicator/>
    }
    return (
        <View>
           {currentEpisode &&  <VideoPlayer episode={currentEpisode}/>}
            
            <FlatList 
            data={episodes} 
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
       
        {currentSeason && (

        <Picker
            style={{color: 'white', width: 130, marginTop: 5}}
            dropdownIconColor={'white'}
            selectedValue={currentSeason.name}
            onValueChange={(itemValue, itemIndex) =>{
                setCurrentSeason(seasons[itemIndex])
            }}>
                {seasonNames.map(seasonName => (
                    <Picker.Item label={seasonName} value={seasonName} key={seasonName}/>
                ))}
        </Picker>
        )}

            </View>
            )}
            />
        </View>
        
    )
}

export default MovieDetailsScreen
