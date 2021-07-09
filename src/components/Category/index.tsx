import React from 'react'
import { View, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'
import { theme } from '../../global/styles/theme'
import { LinearGradient } from 'expo-linear-gradient'

import { styles } from './styles'

type Props = RectButtonProps & {
    title: String;
    icon: React.FC<SvgProps>;
    hasCheckBox?:boolean;
    cheked?: boolean;
}

export function Category({
    title,
    icon: Icon,
    cheked = false,
    hasCheckBox =false,
    ...rest
}: Props) {
    const { secondary40, secondary50, secondary70, secondary85 } = theme.colors;

    return (
        <RectButton {...rest}>
            <LinearGradient
                style={styles.container}
                colors={[secondary50, secondary70]}
            >

                <LinearGradient
                    style={
                        [
                            styles.content,
                            { opacity: cheked ? 1 : 0.5 }]}
                    colors={
                        [cheked
                            ? secondary85
                            : secondary50, secondary40]
                    }
                >
                    {   hasCheckBox &&
                    
                        <View style={cheked ? styles.cheked : styles.check} />

                    }

                    <Icon width={48} height={48} />
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </LinearGradient>

            </LinearGradient>
        </RectButton>
    )
}