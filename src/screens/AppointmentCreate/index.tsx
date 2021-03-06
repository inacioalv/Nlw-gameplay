import React from "react";
import { Feather } from '@expo/vector-icons'
import { useState } from "react";
import {
    Text,
    View,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    Alert
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import uuid from 'react-native-uuid'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";

import { COLLECTION_APPOINTMENTS } from '../../configs/database'
import { Background } from '../../components/Background'
import { CategorySelect } from '../../components/CategorySelect'
import { Header } from '../../components/Header'
import { GuildIcon } from '../../components/Guildicon'
import { SmallInput } from '../../components/SmallInput'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { ModalView } from '../../components/ModalView'
import { Guilds } from "../Guilds";
import { GuildProps } from "../../components/Guild";

import {styles } from './styles'
import { theme } from "../../global/styles/theme";

export function handleAppointmentCreate() {

    const [category, setCategory] = useState('');
    const [openGuildsModal, setopenGuildsModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
    const [inputError, setInputError] = useState('');

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [description, setDescription] = useState('')


    const navigation = useNavigation();

    function handleOpenGuilds() {
        setopenGuildsModal(true);
    }
    function handleCloseGuilds() {
        setopenGuildsModal(false);
    }

    function handleGuildSelect(guildSelect: GuildProps) {
        setopenGuildsModal(false);
        setGuild(guildSelect);
    }

    function handleCategorySelect(categoryId: string) {
        setCategory(categoryId);
    }

    async function handleSave() {
        if (!day) {
            setInputError('Informe o dia');
            return;
        }
        if (!month) {
            setInputError('Informe o M??s');
            return;
        }
        if (!hour) {
            setInputError('Informe a hora');
            return;
        }
        if (!minute) {
            setInputError('Informe o minuto');
            return;
        }
        if (!category) {
            setInputError('Informe a categoria');
            return;
        }
        if (!description) {
            setInputError('Informe a descri????o');
            return;
        }
    

        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} ??s ${hour} : ${minute}h`,
            description
        };

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );
        navigation.navigate('Home');
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Background>
                <ScrollView>
                    <Header
                        title="Agendar partida"
                    />
                    <Text style={[
                        styles.label,
                        {
                            marginLeft: 24,
                            marginTop: 36,
                            marginBottom: 18
                        }]}>
                        Categoria
                    </Text>

                    <CategorySelect
                        hasCheckBox
                        setCategory={handleCategorySelect}
                        categorySelect={category}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {
                                    guild.icon
                                        ? <GuildIcon
                                            guildId={guild.id}
                                            iconId={guild.icon}
                                        />
                                        : <View style={styles.image} />
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name ? guild.name : 'Selecione um servidor'}
                                    </Text>
                                </View>

                                <Feather
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />
                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Dia e m??s
                                </Text>
                                <View style={styles.column}>

                                    <SmallInput
                                        maxLength={2}
                                        name="day"
                                        onChangeText={setDay}
                                    />

                                    <Text style={styles.divider}>
                                        /
                                    </Text>

                                    <SmallInput
                                        maxLength={2}
                                        name="month"
                                        onChangeText={setMonth} />

                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Hora e minuto
                                </Text>

                                <View style={styles.column}>

                                    <SmallInput
                                        maxLength={2}
                                        name="hour"
                                        onChangeText={setHour} />

                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput
                                        maxLength={2}
                                        name="minute"
                                        onChangeText={setMinute} />
                                </View>

                            </View>

                        </View>

                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>
                                Descri????o
                            </Text>
                            <Text style={styles.caracteresLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>
                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />

                        <View style={styles.footer}>
                            <Button
                                title="Agendar"
                                onPress={handleSave}
                            />
                        </View>

                        {<Text>{inputError}</Text>}
                        
                    </View>
                </ScrollView>
            </Background>

            <ModalView
                coloseModal={handleCloseGuilds} visible={openGuildsModal}>
                <Guilds handleGuildSelect={handleGuildSelect} />

            </ModalView>

        </KeyboardAvoidingView>
    )
}