Ext.define('ASLKids.controller.IAP', {
     extend: 'Ext.app.Controller',

     config: {
          identifier: 'com.basvanderwilk.aslkids.50signs',

          ready: false,
          purchased: false
     },

	init: function() {
          var me = this;

          if (window.store) {
               me.setup();
               return;
          }

          document.addEventListener('deviceready', function() {
               me.setup();
          }, false);
	},

     setup: function() {
          var me = this;
          
          // Check availability of the storekit plugin
          if (!window.store) {
               alert("window.store not found");
               return;
          }

          store.verbosity = store.INFO;
      
          store.when(this.getIdentifier()).owned(function(product) {
               alert('owned');
               console.log(arguments);
          });
      
          store.when(this.getIdentifier()).approved(function(product) {
               alert('# approved');
               console.log(arguments);

               me.setPurchased(true);
               me.fireEvent('purchase', me);
          });
      
          store.when(this.getIdentifier()).cancelled(function(product) {
               alert('cancelled');
               console.log(arguments);
          });
      
          store.when(this.getIdentifier()).error(function(product) {
               alert('error');
               console.log(arguments);
          });
      
          // store.when(this.getIdentifier()).updated(function(product) {
          //      alert('updated');
          //      console.log('updated', product);
          //      // app.downloadExtraChapter().then(function() {
          //           // alert('downloaded');
          //           // product.finish();
          //      // });
          // });

          store.register({
               id: this.getIdentifier(),
               type: store.NON_CONSUMABLE
          });

          store.ready(function() {
               alert('# ready...');

               me.setReady(true);
               me.fireEvent('ready', me);
          });

          store.refresh();
     },

     purchase: function() {
          store.order(this.getIdentifier());
     },

     restorePurchases: function() {
          store.refresh();
     }
});