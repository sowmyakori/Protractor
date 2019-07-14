let CustomerLogin = function(){
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

//let custLoginBtn = element(by.buttonText("Customer Login"));
let customers = element(by.model("custId"));
let loginBtn = element(by.buttonText("Login"));



this.selectCustomer = async function(cname){
    let items = await customers.all(by.repeater("cust in Customers"))
    for(let i=0;i<items.length;i++)
    {
       let txt = await items[i].getText()
            if(txt==cname){
                items[i].click()
                logger.info("Selected customer from Customer list---->"+cname);
                
            }
        
    }
    return this;

}

this.clickLoginBtn =async function(){
    await loginBtn.click();
    logger.info("Customer login success...")
    return require("./AccountPage.js")
}

this.verifyCustDropDown = async function(){
  await expect(customers.isPresent());
  logger.info("Customer logged out and verified for customers dropdown");
  return this;

}


} 
module.exports=new CustomerLogin();