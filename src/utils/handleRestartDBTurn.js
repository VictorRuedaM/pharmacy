const {turnModel} = require('../models');
const Colors = require('@colors/colors');


/**
 * handleRestarDBTurn function that reset the turn collection from the database, 
 * if reset is successful print message info. But if reset is error shows a message with the error.
 * 
 */
const handleRestartDBTurn = async () => {
  
  try {
    const result = await turnModel.deleteMany();
    
    if(result){
      console.log(Colors.bgCyan.black('==>> Turn collection has been successfully reset '))
    }else{
      console.log(Colors.bgCyan.black('==>> It was not possible to reset Turn collection '));
    }
  } catch (error) {
    console.log(Colors.bgRed.black(`** Error to reset Turn colletion : [${error}] **`));
  }

}


module.exports = handleRestartDBTurn;