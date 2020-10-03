
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StudentList from './studentList';
import StudentForm from './studentForm';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="EmployeeList">
                <Stack.Screen name="StudentList" component={StudentList} />
                <Stack.Screen name="StudentForm" component={StudentForm} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;