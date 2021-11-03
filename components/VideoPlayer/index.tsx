import React, { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { Episode } from '../../types'
import {Video} from 'expo-av'
import styles from './styles'
import Storage from '@aws-amplify/storage';

interface VideoPlayerProps {
    episode: Episode;
}

const VideoPlayer = (props: VideoPlayerProps) => {
    const {episode} = props;
    const video = useRef<Playback>(null);
    const [status, setStatus] = useState({});
    const [videoURL, setVideoURL] = useState('')

    useEffect(() => {
        if(!video) {
            return;
        }
        (async ()=> {
            await video?.current?.unloadAsync();
            await video?.current?.loadAsync(
                {uri: episode.video},
                {},
                false
            );
        })
    },[episode])

    useEffect(() => {
        if(episode.video.startsWith('http')){
            setVideoURL(episode.video)
        }
        Storage.get(episode.video)
        .then(setVideoURL);
    },[])
    console.log(videoURL)


    return (
            <Video 
            ref={video}
            style={styles.video}
            source={{
            uri: videoURL,
            }}
            posterSource={{uri: episode.poster}}
            posterStyle={{resizeMode: 'cover'}}
            usePoster={true}
            useNativeControls
            resizeMode="contain"
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
     )
 }

export default VideoPlayer
