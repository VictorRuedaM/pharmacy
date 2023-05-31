const {validationResult} = require('express-validator');
const Colors = require('@colors/colors');

const validateResulst = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    console.log(Colors.red(`** Error in Validation, Invalid Params in Request **`))
    res.status(400).send({message: 'Invalid Params', Errors: error.array()})
  }

}


module.exports = validateResulst;