/**
 * Direction
 * Divide students to all of groups & students must sorted by first name
 *
 * Expected Result
 * [
 *   [
 *     { "firstName": "Belle", "lastName": "Norton" },
 *     { "firstName": "Finnley", "lastName": "Rennie" }
 *   ],
 *   [
 *     { "firstName": "Kai", "lastName": "Lyons" },
 *     { "firstName": "Peyton", "lastName": "Gardner" }
 *   ],
 *   [{ "firstName": "Tatiana", "lastName": "Dickerson" }]
 * ]
 */
const students = [
    { firstName: "Kai", lastName: "Lyons" },
    { firstName: "Belle", lastName: "Norton" },
    { firstName: "Finnley", lastName: "Rennie" },
    { firstName: "Tatiana", lastName: "Dickerson" },
    { firstName: "Peyton", lastName: "Gardner" },
];

const groups = 3;

function result(students, groups) {
    // your code here
    students = students.sort((a, b) => {
        if (a.firstName[0] < b.firstName[0]) {
            return -1;
        }
    });

    let finalArr = [];
    let count = students.length % groups;
    let limit = Math.round(students.length / groups);
    let tempArr = [];
    for (let i = 0; i < students.length; i++) {
        if (tempArr.length < limit || i == students.length - 1) {
            tempArr.push(students[i]);
        }
        if (tempArr.length == limit && count > 0) {
            finalArr.push(tempArr);
            tempArr = [];
            count -= 1;
        } else if (tempArr.length == limit || i == students.length - 1) {
            finalArr.push(tempArr);
            tempArr = [];
        }
    }
    return finalArr;
}

console.log(result(students, groups));
