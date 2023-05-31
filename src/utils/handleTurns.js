const Colors = require('@colors/colors');
const {turnModel} = require("../models");

const handleTurns = async () => {
    const turns = await turnModel.find({});
    if(!turns.length){
        console.log(Colors.bgWhite.black(`==>>** Not Turns in DB **`));
    }else{
        const turnSort = turns.sort((a, b) =>{
            const [hourA, minA] = a.timeSlot?.split(":").map(Number);
            const [hourB, minB] = b.timeSlot?.split(":").map(Number);

            if (hourA === hourB && minA === minB) {
                return a._id - b._id; 
            }
              return hourA - hourB;
        });
        console.log(Colors.bgCyan.black(`==>>** Turns Loaded **`));
        console.log(turnSort);
    }
    
};

module.exports = {
    handleTurns,
};