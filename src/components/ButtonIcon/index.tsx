import React from 'react'
import {View,Image,Text,} from 'react-native'
import { RectButton,RectButtonProps } from 'react-native-gesture-handler'

import DiscordImg from '../../assets/discord.png'

import { styles } from './styles'

type Props = RectButtonProps & {
    title: string;
}
export function ButtonIcon({ ...props }: Props) {
    return (
        <RectButton
            style={styles.container}
            {...props} >

            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon} />
            </View>
            <Text style={styles.title}>
                {props.title}
            </Text>
        </RectButton>
    )
}