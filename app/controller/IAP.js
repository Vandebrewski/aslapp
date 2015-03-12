Ext.define('ASLKids.controller.IAP', {
     extend: 'Ext.app.Controller',

     config: {
          list: ['50signs']
     },

	init: function() {
          // Check availability of the storekit plugin
          if (!window.storekit) {
               console.log("In-App Purchases not available");
               return;
          }
      
          // Initialize
          storekit.init({
               debug:    true, // Enable IAP messages on the console
               ready:    this.onReady,
               purchase: this.onPurchase,
               restore:  this.onRestore,
               error:    this.onError
          });
	},
	
	onReady: function() {
          storekit.load(this.getList(), function (products, invalidIds) {
               IAP.products = products;
               IAP.loaded = true;
               for (var i = 0; i < invalidIds.length; ++i) {
                    console.log("Error: could not load " + invalidIds[i]);
               }
          });
	},
	
	onPurchase: function(transactionId, productId, receipt) {
          if(productId === '50signs'){
               alert("50 signs added");
               //Code to remove ads for the user
          }
	},
	
	onRestore: function(transactionId, productId, transactionReceipt) {
          if(productId == '50signs'){
               //Code to remove ads for the user
          }
	},
	
	onError: function(errorCode, errorMessage) {
          console.log(errorCode);
          console.log(errorMessage);
	},
	
	buy: function(productId){
          storekit.purchase(productId);
	},
	
	restore: function(){
          storekit.restore();
	}
});