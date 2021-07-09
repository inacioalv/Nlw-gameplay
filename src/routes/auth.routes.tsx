import React from "react";
import {createStackNavigator} from '@react-navigation/stack'

import {Home} from '../screens/Home'
import {SignIn} from '../screens/Signin'
import {AppointmentDetalis} from '../screens/AppointmentDetalis'
import {handleAppointmentCreate} from '../screens/AppointmentCreate'
import { theme } from "../global/styles/theme";

const {Navigator,Screen} = createStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator
            headerMode="none"
            screenOptions={{
                cardStyle:{
                    backgroundColor:theme.colors.secondary100
                }
            }}
            >
            <Screen
                name="SignIn"
                component={SignIn}
            /> 
            <Screen
                name="Home"
                component={Home}
            /> 
            <Screen
                name="AppointmentDetalis"
                component={AppointmentDetalis}
            /> 
            <Screen
                name="handleAppointmentCreate"
                component={handleAppointmentCreate}
            /> 
        </Navigator>
    )
}