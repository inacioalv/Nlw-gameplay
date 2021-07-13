import React from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native'


import { Background } from '../../components/Background'
import { ButtonIcon } from '../../components/ButtonIcon'
import { useAuth } from '../../hooks/auth'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'
import IllustrationImg from '../../assets/illustration.png'

export function SignIn() {
  
    const { loading, singIn } = useAuth();

    async function handleSignIn() {
        try {
            await singIn();
        } catch (error) {
            Alert.alert(error)
        }
        // navigation.navigate('Home');
    }

    return (
        <Background>
            <View style={styles.container}>

                <Image
                    source={IllustrationImg}
                    style={styles.image}
                    resizeMode="stretch"
                />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        Conecte-se {'\n'}
                        e organize suas
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games {'\n'}
                        favoritos com seus amigos
                    </Text>
                    {
                        loading
                            ? <ActivityIndicator  color={theme.colors.primary}/>
                            :
                            <ButtonIcon
                                onPress={handleSignIn} title="Entrar com Discord" />
                    }
                </View>
            </View>
        </Background>
    );
}

