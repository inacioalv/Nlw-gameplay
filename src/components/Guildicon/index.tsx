import React from "react";
import { Image } from "react-native";

import {styles} from './styles'


export function GuildIcon(){
    const uri ='https://i.dlpng.com/static/png/6584809_preview.png';
    
    return(
           <Image 
            source={{ uri}}
            style={styles.image}
            resizeMode="cover"
            />
               
           
        
    )
}