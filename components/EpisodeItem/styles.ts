import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image:{
        height: 75,  
        aspectRatio: 16/9,  
        resizeMode: 'cover', 
        borderRadius: 3,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    title:{},
    titleContainer: {
        flex: 1,
        padding: 5, 
        justifyContent: 'center'
    },
    duration: {
        color: 'darkgrey',
        fontSize: 10
    },
    plot:{
        color:'darkgrey'
    }
})

export default styles;