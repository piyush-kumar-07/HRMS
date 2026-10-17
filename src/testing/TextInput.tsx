import react, { useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, Text } from 'react-native';
import { Button, Alert } from 'react-native';



//export default function LoginScreen() {
const [email, setEmail] = useState<string>('');

const handleLogin = (): void => {
    Alert.alert('Login', 'Button pressed');
};
<Button
    title="Login"
    onPress={handleLogin}
/>
/* return (
     <View>
         <TextInput
             placeholder='Enter Your Email'
             value={email}
             onChangeText={setEmail}
         />


         <Text>{email}</Text>
     </View>
 );*/
//}
type Employee = {
    id: string;
    name: string;
    age: number;
    department: string;
};
const employee: Employee[] = [
    {
        id: 'EMP001',
        name: 'Rahul Kumar',
        age: 26,
        department: 'Accountant',
    },
    {
        id: 'EMP002',
        name: 'Rajesh Mishra',
        age: 28,
        department: 'Technician',
    },
];

export default function EmployeeScr() {
    const [search, setSearch] = useState<string>(" ");

    const filteredEmployee = employee.filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase())
    );

    /* return (
         <FlatList<Employee>
             data={employee}
             keyExtractor={(item) => item.id}
             renderItem={({ item }) => (
                 <View>
                     <Text>{item.name}</Text>
                     <Text>{item.age}</Text>
                     <Text>{item.department}</Text>
                 </View>
             )}
         />
     );
     */
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Employees</Text>

            <TextInput
                style={styles.input}
                placeholder="Search employee"
                value={search}
                onChangeText={setSearch}
            />

            <FlatList<Employee>
                data={filteredEmployee}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>{item.department}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text>No employees found.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    card: {
        padding: 16,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 8,
        marginBottom: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
