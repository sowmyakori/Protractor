let Transaction = function(){

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

  let rows = element.all(by.repeater("tx in transactions | orderBy:sortType:sortReverse | sDate:startDate:end"));
  let cell1 = element(by.xpath("//a[contains(text(),'Date-Time')]"));
  let amountCell  = element(by.xpath("//table//tbody//tr[1]//td[2]"));
  let tnxType = element(by.xpath("//table//tbody//tr[1]//td[3]"));
  let resetBtn = element(by.buttonText("Reset"));
  let backBtn = element(by.buttonText("Back"));
  

  this.checkTransactionHistory = async function(){
      let size = await rows.count();
      logger.info("Size of rows in transaction table----->"+size);
      expect(size).toBe(0);
      return this;
  }

  this.checkAmount = async function(balance)
  {
    await cell1.click();
    let amount =await  amountCell.getText();
    logger.info("Expected balance____________________"+balance+"actual balance______________________"+amount);
    expect(amount).toBe(balance.toString());
    logger.info("Amount verified from transaction history Table");
    return this;
  }
    
  this.checkTnxType = async function(tnx){

    let type = await tnxType.getText();
    expect(type).toBe(tnx);
    logger.info("Transaction Type verified from history Table");
    return this;
  }

  this.clickResetBtn = async function(){
      await resetBtn.click();
      logger.info("CLicked Reset button");
      return this;

  }
  this.clickBackBtn = async function(){
    await backBtn.click();
    logger.info("Clicked Back button")
    return require("./AccountPage.js");
  }
}
module.exports = new Transaction();