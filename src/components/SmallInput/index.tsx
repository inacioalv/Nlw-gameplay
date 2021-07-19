import React from "react";
import { View } from "react-native";
import { TextInput,TextInputProps} from "react-native";

import { styles } from './styles'

type Props = TextInputProps & {
    name: string;
}

export function SmallInput({name,...rest}:Props) {
    return (
        <View>
            <TextInput
                style={styles.container}
                keyboardType="numeric"
                {...rest}
            />
        </View>
    )
}