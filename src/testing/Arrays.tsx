import React from "react";
import { useState } from "react";
let employeeNames: string[] = [
    'Rahul',
    'Anish',
];
let salaries: number[] = [
    25000,
    35000,
];
let employee: {
    name: string;
    age: 25,
    salary: 25000,

};
type Employee = {
    name: string;
    age: number;
    department: string;
};
let employee1: Employee = {
    name: 'Rakesh',
    age: 25,
    department: 'Technician',
};
let employee2: Employee = {
    name: 'Subash',
    age: 20,
    department: 'Accountant',
};
interface Employees {
    name: string;
    age: number;
    department: string;
    middelName?: string,// use'?' when we want to make something optional 
}
const employees: Employees = {
    name: 'Rahul',
    age: 25,
    department: 'Scuba-diving',
    middelName: 'jaydev',
};
type Role = "Admin" | "HR" | "Staff";
let userRole: Role = "Admin";
userRole = "Staff";
userRole = "HR";

let employeeNamess: string[] = [
    "Amit",
    "Rahul",
    "Rakesh",

];

const [name, setName] = useState("");
setName("Rahul")
const [salary, setSalary] = useState(25000);
setSalary(30000);
type Employeeee = {
    name: string;
    age: number;
    department: string;
    isPresent: boolean;
}

const [employeeee, setEmployeeee] = useState<Employeeee>({
    name: "Subash",
    age: 20,
    department: "Owner",
    isPresent: true,
});
setEmployeeee((previous) => ({
    ...previous,//used spread operator to add changes on specific values not on all 

    age: 21,
}));