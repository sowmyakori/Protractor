let AddCustomer = function(){
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

      let firstName = element(by.model("fName"));
      let lastName = element(by.model("lName"));
      let postalCode = element(by.model("postCd"));
      let addCustBtn = element(by.className("btn btn-default"));

      this.setFirstName = function(fname){
          firstName.sendKeys(fname);
          return this;
      }

      this.setLastName = function(lname){
          lastName.sendKeys(lname);
          return this;
      }

      this.setPostalCode= function(pcode){
          postalCode.sendKeys(pcode);
          return this;
      }

      this.clickAddCustBtn = async function(){
          await addCustBtn.click();
          return this;
      }

          this.acceptAlert = async function(alertMsg){
          let alert = browser.switchTo().alert();
          let txt = await alert.getText();
          logger.info("Expected text------->"+alertMsg);
          logger.info("actual message------>"+txt);
          expect(txt).toContain(alertMsg);
          alert.accept();

      }


}
module.exports = new AddCustomer();