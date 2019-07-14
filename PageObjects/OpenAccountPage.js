let OpenAccount = function(){
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

      let custDropdown = element(by.model("custId"));
      let currencyDropdown = element(by.model("currency"));
      let processBtn = element(by.buttonText("Process"));


      this.selectCustomer = async function(custName){
         let customers = await custDropdown.all(by.tagName("option"));
         logger.info("Selecting customer from customer dropdown") 
         for(let i=0;i<customers.length;i++){
             let name = await customers[i].getText();            
             if(name==custName){
                 customers[i].click();
                 logger.info("Customer selected ---->"+name);
             }
         }
         return this;
      }

      this.selectCurrency = async function(currency){
          await currencyDropdown.$('[value='+currency+']').click();
          return this;
      }

      this.clickProcess = async function(){
          await processBtn.click();
          return this;
      }

      this.acceptAlert = async function(alertMsg){
        let alert = await browser.switchTo().alert();
        let txt = await alert.getText();   
        expect(txt).toContain(alertMsg);
        alert.accept();
        return this;      

      }
}
module.exports = new OpenAccount();