import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";


import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from '../../components/Background'
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Load } from "../../components/Load";

import { styles } from './styles'


export function Home() {
    const [category, setCategory] = useState('');
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();


    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmendDetails(guildSelected:AppointmentProps) {
        navigation.navigate('AppointmentDetalis',{guildSelected});
    }

    function handleAppointmentCreate() {
        navigation.navigate('handleAppointmentCreate');

    }


    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if (category) {
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage)
        }

        setLoading(false);
    }


    useFocusEffect(useCallback(() => {
        loadAppointments()
    }, [category]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>

            <CategorySelect
                categorySelect={category}
                setCategory={handleCategorySelect} />

            {loading
                ? <Load /> :
                <>
                    <ListHeader
                        title="Partidas agendadas"
                        subtitle={`Total ${appointments.length}`}
                    />

                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Appointment
                                data={item}
                                onPress={() =>handleAppointmendDetails(item)}
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider />}
                        contentContainerStyle={{ paddingBottom: 69 }}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            }
        </Background>
    )
}