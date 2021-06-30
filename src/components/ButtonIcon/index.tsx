import React from 'react'
import DiscordImg from '../../assets/discord.png'
import {styles} from './styles'
import { 
    TouchableOpacity,
    View,
    Image,
    Text,
    TouchableOpacityProps
 } from 'react-native'
type Props = TouchableOpacityProps & {
    title:string;
}
export function ButtonIcon({...props}:Props){
    return(
        <TouchableOpacity style={styles.container} {...props} >
                
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon}/>
            </View>
            <Text style={styles.title}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}