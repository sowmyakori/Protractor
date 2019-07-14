let ManagerLogin = function(){
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

    let addCustomerBtn = element(by.buttonText("Add Customer"));
    let openAccountBtn = element(by.buttonText("Open Account"));
    let customersBtn = element(by.buttonText("Customers"));

    this.verifyAddCustomerBtn = async function(){
        await expect(addCustomerBtn.isPresent());
        logger.info("Add Customer button is present");
        return this;
    }
    this.verifyOpenAccountBtn = async function(){
        await expect(openAccountBtn.isPresent());
        logger.info("Open Account button is present");
        return this;
    }
    this.verifyCustomersBtn = async function(){
        await expect(customersBtn.isPresent());
        logger.info(" Customers button is present");
        return this;
    }

    this.clickAddCustomer = async function(){
        await addCustomerBtn.click();
        logger.info("Add customer button clicked")
        return require("./AddCustomerPage.js")
    }

    this.clickOpenAccount = async function(){
        await openAccountBtn.click();
        return require("./OpenAccountPage.js");
    }

    this.clickCustomers = async function(){
        await customersBtn.click();
        return require("./CustomersPage.js");
    }
}
module.exports = new ManagerLogin();