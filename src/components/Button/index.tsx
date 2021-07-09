import React from 'react'
import {Text,} from 'react-native'
import { RectButton,RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'

type Props = RectButtonProps & {
    title: string;
}
export function Button({ ...props }: Props) {
    return (
        <RectButton
            style={styles.container}
            {...props} >
            <Text style={styles.title}>
                {props.title}
            </Text>
        </RectButton>
    )
}