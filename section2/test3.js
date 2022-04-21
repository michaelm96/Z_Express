// Question
// Given a object data, return the data multiple by 3 and sort the data.
// Expected output : { j: 0, k: 9, i: 18, l: 36 }

const data = { i: 6, j: null, k: 3, l: 12 };

function result(data) {
    // write your code here
    let tempArr = [];
    const final = {};
    for (const property in data) {
        tempArr.push([property, data[property] * 3]);
    }
    tempArr = tempArr.sort((a,b) => a[1] - b[1]);
    tempArr.forEach((ele) => final[ele[0]] = ele[1]);
    return final;
}

console.log(result(data));
