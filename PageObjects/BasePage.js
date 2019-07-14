let BasePage = function(){
let winston = require("winston");

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: './Log/error.log', level: 'error' }),
      new winston.transports.File({ filename: './Log/combined.log' })
    ]
  });

    let customerLoginBtn = element(by.buttonText("Customer Login"));
    let ManagerLoginBtn = element(by.buttonText("Bank Manager Login"));

    this.verifyCustomerloginBtn = async function()
    {
       await  expect(customerLoginBtn.isPresent());
       logger.info("Customer login button is present");
       return this;
    }

    this.verifyManagerBtn = async function(){
        await expect(ManagerLoginBtn.isPresent());
        logger.info("Manage login button is present");
        return this;
    }

    this.clickCustLogin = async function(){
        await customerLoginBtn.click();
        logger.info("Customer login..");
        return require("./CustomerLoginPage.js");
     }

     this.clickManagerLogin = async function(){
         await ManagerLoginBtn.click();
         return require("./ManagerLoginPage.js");
     }
     
}
module.exports = new BasePage();