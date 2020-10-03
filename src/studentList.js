
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import realm, { createStudent, deleteStudent, updateStudent, getAllStudent } from './database/databaseMethod';

const studentList = (props) => {

    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        getStudentList();
    },[])

    const onAddStudent = (payload) => {
        createStudent(payload);
        getStudentList();
        Alert.alert("Student Added Successfully.");
    }

    const onDeleteStudent = (id) => {
        deleteStudent(id);
        getStudentList();
        Alert.alert("Record Deleted Successfully.");
    }

    const onEditStudent = (payload) => {
        updateStudent(payload);
        getStudentList();
        Alert.alert("Student Updated Successfully.");
    }

    const getStudentList = async() => {
        await getAllStudent().then((res) => {
            let studentRes = JSON.parse(JSON.stringify(res));
            console.log('sss', studentRes);
            setStudentList(studentRes);
        });
    }

    return (
        <View style={{ padding: 20 }}>
            <TouchableOpacity
                style={styles.addStudent}
                onPress={() => props.navigation.navigate('StudentForm', { onAddStudent: (student) => onAddStudent(student), editAble: false })}>
                <Text style={styles.submitButtonText}>Add Student</Text>
            </TouchableOpacity>
            <Text style={styles.viewMargin}>Student List</Text>
            <FlatList
                style={styles.viewMargin}
                data={studentList}
                extraData={studentList}
                renderItem={({ item, index }) => (
                    <View key={index} style={{ justifyContent: 'center', marginBottom: 10 }}>
                        <Text>{item.student_id}</Text>
                        <Text>{item.student_name}</Text>
                        <Text>{item.student_class}</Text>
                        <Text>{item.student_subject}</Text>
                        <View style={styles.btnView}>
                            <TouchableOpacity
                                style={[styles.editDeleteBtn, { marginRight: 10 }]}
                                onPress={() => props.navigation.navigate('StudentForm', { onEditStudent: (student) => onEditStudent(student), editAble: true, item })}>
                                <Text style={styles.submitButtonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.editDeleteBtn}
                                onPress={() => onDeleteStudent(item.student_id)}>
                                <Text style={styles.submitButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    addStudent: {
        backgroundColor: '#009688',
        padding: 10,
        height: 40,
    },
    viewMargin: {
        marginTop: 10
    },
    btnView: {
        flexDirection: 'row',
        marginTop: 10
    },
    editDeleteBtn: {
        flex: 0.5,
        backgroundColor: '#009688',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default studentList;