let Customers = function(){
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

      let searchCust = element(by.model("searchCustomer"));
      let deleteBtn = element(by.buttonText("Delete"));

      this.setSearchCust = async function(custName){
        await  searchCust.sendKeys(custName);
        logger.info("Searching for Customer....")
          return this;
      }
      this.clickDeleteBtn = async function(){
          await deleteBtn.click();
          logger.info("Customer deleted....")
          return this;
      }
}
module.exports = new Customers();