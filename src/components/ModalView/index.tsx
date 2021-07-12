import React, { ReactNode } from "react";
import {
    Modal,
    ModalProps,
    TouchableWithoutFeedback,
    View,

} from 'react-native'
import { Background } from '../Background'

import { styles } from './styles'

type Props = ModalProps & {
    children: ReactNode;
    coloseModal:() => void ;
}

export function ModalView({ 
    children,
    coloseModal, 
    ...rest 
}: Props) {
    return (
        <Modal
            transparent
            animationType="slide"
            statusBarTranslucent
            {...rest}
        >
            <TouchableWithoutFeedback onPress={coloseModal}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Background>
                            <View style={styles.bar} />
                            {children}
                        </Background>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}