
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
        logger.info("****************************************Testcase executione begins***************************************")
        logger.info("Login successfull");
    });
    afterEach(function(){
        browser.sleep(2000)
        logger.info("*******************************************Testcase executione ends***************************************")
    });
    it("TC01_LoginPage", async function(){
       
        basePage.verifyCustomerloginBtn();
        basePage.verifyManagerBtn();
    });

    it("TC02_ManagerLogin",async function(){
       let managerLogin = await basePage.clickManagerLogin();
       managerLogin.verifyAddCustomerBtn();
       managerLogin.verifyOpenAccountBtn();
       managerLogin.verifyCustomersBtn();
    });
    it("TC03_AddCustomer", async function(){
        let managerLogin = await basePage.clickManagerLogin();
        managerLogin.verifyAddCustomerBtn();
        let addCustomer = await managerLogin.clickAddCustomer();
        addCustomer.setFirstName(data.addCust.fName);
        addCustomer.setLastName(data.addCust.lName);
        addCustomer.setPostalCode(data.addCust.postalCode);
        
        await addCustomer.clickAddCustBtn();
        browser.sleep(2000);
        await addCustomer.acceptAlert(data.addCust.alertMessage);
    });
    it("TC04_Open Account for Dollar", async function(){
        let managerLogin = await basePage.clickManagerLogin();
        managerLogin.verifyOpenAccountBtn();
        let openAccount = await managerLogin.clickOpenAccount();
        await openAccount.selectCustomer(data.addCust.fName+" "+data.addCust.lName);
        await openAccount.selectCurrency(data.openAcc.currency1);
        await openAccount.clickProcess();
        browser.sleep(3000);
        await openAccount.acceptAlert(data.openAcc.alertMsg);    
    });

    it("TC05_Open Account for Pound", async function(){
        let managerLogin = await basePage.clickManagerLogin();
        managerLogin.verifyOpenAccountBtn();
        let openAccount = await managerLogin.clickOpenAccount();
        await openAccount.selectCustomer(data.addCust.fName+" "+data.addCust.lName);
        await openAccount.selectCurrency(data.openAcc.currency2);
        await openAccount.clickProcess();
        browser.sleep(3000);
        await openAccount.acceptAlert(data.openAcc.alertMsg);    

    });

    it("TC06_Open Account for Rupee", async function(){
        let managerLogin = await basePage.clickManagerLogin();
        managerLogin.verifyOpenAccountBtn();
        let openAccount = await managerLogin.clickOpenAccount();
        await openAccount.selectCustomer(data.addCust.fName+" "+data.addCust.lName);
        await openAccount.selectCurrency(data.openAcc.currency3);
        await openAccount.clickProcess();
        browser.sleep(3000);
        await openAccount.acceptAlert(data.openAcc.alertMsg);    
    });

    it("TC07_Delete Customer",async function(){
        let managerLogin = await basePage.clickManagerLogin();
        managerLogin.verifyOpenAccountBtn();
        let customers = await managerLogin.clickCustomers();
       await customers.setSearchCust(data.addCust.fName);
       browser.sleep(2000);
        await customers.clickDeleteBtn();
    });
    it("TC08_Customer Login", async function(){
        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
    });

    it("TC09_VerifyCurrencyType", async function(){

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

     it("TC10_InitialTransaction", async function(){

        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        let transaction = await account.clickTransaction();
        transaction.checkTransactionHistory();

    });

    it("TC11_DepositMoney", async function(){
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

    it("TC12_TransactionAfterDeposite", async function(){

        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        await account.selectAccount(data.account.acc3);
         let transaction = await account.clickTransaction();
        await  transaction.checkAmount(data.account.depositAmount);
        await transaction.checkTnxType(data.transaction.tnxC);
    });

    it("TC13_WithDrawError", async function(){
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

    it("TC14_WithDrawSuccess", async function(){

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
    
    it("TC15_TransactionAfterWithdraw", async function(){

        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        await account.selectAccount(data.account.acc3);      
        let transaction = await account.clickTransaction();        
        await  transaction.checkAmount(data.account.depositAmount-data.account.correctAmt);        
        await transaction.checkTnxType(data.transaction.tnxD);
    });

    it("TC16_TransactionReset", async function(){
        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        await account.selectAccount(data.account.acc3);
        let transaction = await account.clickTransaction();
        await transaction.clickResetBtn();
        transaction.checkTransactionHistory();
    });

    it("TC17_GoTo main page", async function(){
        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        await account.selectAccount(data.account.acc3);
        let transaction = await account.clickTransaction();
        await transaction.clickBackBtn();
        await account.verifyLogin(data.customer.welcomeTxt);       
    });

    it("TC18_Logout", async function(){
        let custLogin= await basePage.clickCustLogin();
        await  custLogin.selectCustomer(data.customer.cname);
        let account= await custLogin.clickLoginBtn();
        await account.verifyLogin(data.customer.welcomeTxt);
        await account.clickLogoutBtn();
        await custLogin.verifyCustDropDown();

    })

});