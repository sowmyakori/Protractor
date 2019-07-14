let Account = function(){
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
  let accounts =  element(by.model("accountNo"));
  let currency =  element(by.xpath("//strong[@class='ng-binding'][3]"));
  let greetText =  element(by.xpath("//div[@class='borderM box padT20 ng-scope']//div[1]//strong[1]"));
  let tranactionBtn = element(by.buttonText("Transactions"));
  let depositeBtn = element(by.buttonText("Deposit"));
  let amount = element(by.model("amount"));
  let submitDeposit = element(by.className("btn btn-default"));
  let balance = element(by.xpath("//div[@class='center']//strong[2]"));
  let withdrawlBtn = element(by.buttonText("Withdrawl"));
  let submitWithdraw = element(by.buttonText("Withdraw"));
  let errorMsg = element(by.xpath("//span[@class='error ng-binding']"));
  let logoutBtn = element(by.buttonText("Logout"));

  this.verifyLogin =async function(welcomeTxt){
        let txt = await greetText.getText();
        expect(txt).toContain(welcomeTxt);
        logger.info("Customer login successful");
        return  this;      
}

  this.selectAccount = async function(accNo){
    await accounts.$('[value="number:'+accNo+'"]').click(); 
    logger.info("Account selected------------>"+accNo);
    return this;    
  }

  this.verifyCurrency = async function(expectedCurrency){    
    let actualCurrency = await currency.getText();
    logger.info("expected Currency-------------->"+expectedCurrency);
    logger.info("Actual Currency Displayed------------>"+actualCurrency);
    expect(actualCurrency).toBe(expectedCurrency);
  }

  this.clickTransaction = async function(){
     await tranactionBtn.click();
     return require("./TransactionPage.js");
  }

  this.clickDepositeBtn = async function(){
    await depositeBtn.click();
    return this;
}

this.setAmount = function(amountNum){
    amount.sendKeys(amountNum);
    return this;
}

this.clickSubmitDeposit= async function(){
    await submitDeposit.click();
    logger.info("Depositted successfully")
}

this.checkBalance = async function(amountNum){
    let balanceAmt = balance.getText();
    expect(balanceAmt).toBe(amountNum);
    logger.info("Balance verified after Transaction--------->"+balanceAmt);
    return this;
}

this.clickWithdrawl = async function(){
    await withdrawlBtn.click();
    logger.info("Withdrawl button clicked");
    return this;
}

this.clickSubmitWithdraw = async function(){
    await submitWithdraw.click();
    logger.info("Amount withdraw success..")
    return this;
}

this.verifyMessage = async function(tnxMsg){
    let message = await errorMsg.getText();
    logger.info("Message displayed after withdraw--->"+message)
    expect(message).toContain(tnxMsg);
    return this;
}

this.clickLogoutBtn = async function(){
  await logoutBtn.click();
  logger.info("Customer logout from application")
  return require("./CustomerLoginPage");
}

}
module.exports=new Account();