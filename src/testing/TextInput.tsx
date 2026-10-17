import react, { useState } from 'react';
import { View, FlatList, TextInput, Text } from 'react-native';
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
    return (
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
}