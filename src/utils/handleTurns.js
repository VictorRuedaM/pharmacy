const Colors = require('@colors/colors');
const {turnModel} = require("../models");
const handleSendEmail = require('./handleSendEmail');
const moment = require('moment');
const { hourFormat } = require('./handleDate');


const handleTurns = async () => {
    const turns = await turnModel.find({});
    if(!turns.length){
        console.log(Colors.bgWhite.black(`==>>** Not Turns in DB **`));
    }else{
        const hourS = hourFormat();
        const data = [];
        turns.forEach(a => {
            data.push({
                _id: a._id,
                customerEmail: a.customer.customerEmail,
                customerName: a.customer.name +" "+ a.customer.surName,
                hour: a.timeSlot,
                action: 'update'
            })
            return data;
        });
        
        const turnSort = data.sort((a, b) =>{
            const [hourA, minA] = a.hour?.split(":").map(Number);
            const [hourB, minB] = b.hour?.split(":").map(Number);

            if (hourA === hourB && minA === minB) {
                return a._id - b._id; 
            }
              return hourA - hourB;
        });

        const filterTurn = turnSort.filter(t => {
            const hourSistem = hourS.split(":").map(Number)[0];
            const [hourA] = t.hour?.split(":").map(Number);
            const hourB = hourSistem + 1;
            // console.log(hourSistem);
            // console.log(hourB);
            return hourA === hourB;
        });
        console.log(Colors.bgCyan.black(`==>>** Turns Loaded **`));
        handleSendEmail(filterTurn);
    }
    
};

module.exports = {
    handleTurns,
};