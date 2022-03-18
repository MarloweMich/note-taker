const e = require('express');
const db = require('../db/db.json');

// module.exports = () => {
//     const lastID = db.slice(-1);
//     for (var j =0; j<db.length; j++)
//     if (lastID[0].id > db.length){
//             return db[j].id = lastID[0].id+1}
//             else
//     for (var i =0; i<db.length; i++){
//         db[i].id = i}
//     return i
        
// }

module.exports = () => {
    const lastID = db.slice(-1);

        function increaseLastID() {
            return lastID[0].id + 1
        }

    for (let i =0; i<db.length; i++)
    if (lastID[0].id > db.length){
    db[i].id = increaseLastID()}else{
        return i
    } 
}