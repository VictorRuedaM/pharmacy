const Colors = require('@colors/colors');
const {turnModel} = require("../models");
const handleSendEmail = require('./handleSendEmail');

const handleTurns = async () => {
    const turns = await turnModel.find({});
    if(!turns.length){
        console.log(Colors.bgWhite.black(`==>>** Not Turns in DB **`));
    }else{
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
            const hourSistem = new Date().getHours();
            const [hourA] = t.hour?.split(":").map(Number);
            return hourA === (hourSistem + 1);
        });
        console.log(Colors.bgCyan.black(`==>>** Turns Loaded **`));
        handleSendEmail(filterTurn);
    }
    
};

module.exports = {
    handleTurns,
};