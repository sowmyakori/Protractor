//import { browser, element, by } from "protractor";


let winston = require("winston");
let basePage = require("../PageObjects/BasePage.js");
var data= require("../Util/CustomerData.json");

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: './Log/error.log', level: 'error' }),
      new winston.transports.File({ filename: './Log/combined.log' })
    ]
  });
describe("Banking application customer Test",function()
{
    beforeEach(function(){
        browser.get(data.url);
        browser.manage().window().maximize();
        logger.info("****************Testcase executione begins*********")
        logger.info("Login successfull");
    });
    afterEach(function(){
        browser.sleep(2000)
        logger.info("****************Testcase executione ends*********")
    });
    it("TC01_LoginPage", async function(){
       
        basePage.verifyCustomerloginBtn();
        basePage.verifyManagerBtn();
    });

    it("TC02_VerifyCurrencyType", async function(){

       let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        await account.selectAccount(data.account.acc1);
        await account.verifyCurrency(data.account.currency1);
        await account.selectAccount(data.account.acc2);
        await account.verifyCurrency(data.account.currency2);
        await account.selectAccount(data.account.acc3);
        await account.verifyCurrency(data.account.currency3);

    });

    xit("TC03_InitialTransaction", async function(){

        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        let transaction = await account.clickTransaction();
        transaction.checkTransactionHistory();

    });

    it("TC04_DepositMoney", async function(){
        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        await account.selectAccount(data.account.acc3);
        await account.clickDepositeBtn();
        account.setAmount(data.account.depositAmount);
        await account.clickSubmitDeposit();
        await account.checkBalance(data.account.depositAmount);

    });

    it("TC05_TransactionAfterDeposite", async function(){

        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        await account.selectAccount(data.account.acc3);
         let transaction = await account.clickTransaction();
        await  transaction.checkAmount(data.account.depositAmount);
        await transaction.checkTnxType(data.transaction.tnxC);
    });

    it("TC06_WithDrawError", async function(){
        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        await account.selectAccount(data.account.acc3);
        await account.clickWithdrawl();
        account.setAmount(data.account.wrongAmt);
        await account.clickSubmitWithdraw();
        await account.verifyMessage(data.account.tnxError);
    });

    it("TC07_WithDrawSuccess", async function(){

        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        await account.selectAccount(data.account.acc3);
        await account.clickWithdrawl();
        account.setAmount(data.account.correctAmt);
        await account.clickSubmitWithdraw();
        await account.verifyMessage(data.account.tnxSuccess);
        await account.checkBalance(data.account.correctAmt);
    });

    it("TC08_TransactionAfterWithdraw", async function(){

        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        await account.selectAccount(data.account.acc3);      
        let transaction = await account.clickTransaction();        
        await  transaction.checkAmount(data.account.depositAmount-data.account.correctAmt);        
        await transaction.checkTnxType(data.transaction.tnxD);
    });
    it("TC09_TransactionReset", async function(){
        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        await account.selectAccount(data.account.acc3);
        let transaction = await account.clickTransaction();
        await transaction.clickResetBtn();
        transaction.checkTransactionHistory();
    });
})