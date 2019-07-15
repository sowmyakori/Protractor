// An example configuration file.

var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');




exports.config = {
    directConnect: true,
  
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
      'browserName': 'chrome',
      shardTestFiles: false,
      maxInstances: 1,
    },
  //   multiCapabilities:[
  //   {
  //     'browserName':'chrome',
  //   //  specs:['calc_spec.js'],
  //   },
  //   {
  //     'browserName':'firefox',
  //    // specs:['spec.js'],
  //   },
  // ],
  
    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',
  
    // Spec patterns are relative to the current working directory when
    // protractor is called.
   specs: ['./Specs/BankAppE2E_spec.js','./Specs/Customer_spec.js'],

   //SELENIUM_PROMISE_MANAGER: false,
  
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
      defaultTimeoutInterval: 30000
    },

    onPrepare: function() {
      jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
          savePath: 'target/screenshots'
        })
      );
   }
  };
  