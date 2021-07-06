import React from "react";
import { View, Text } from "react-native";

import { Avatar } from '../Avatar'

import { styles } from './styles'

export function Profile() {
    return (
        <View style={styles.container}>

            <Avatar urlImage="https://github.com/inacioalv.png" />

            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        olá
                    </Text>
                    <Text style={styles.username}>
                        Inácio
                    </Text>
                </View>
                <Text style={styles.message}>
                    Hoje é de vitória
                </Text>
            </View>

        </View>
    )
}