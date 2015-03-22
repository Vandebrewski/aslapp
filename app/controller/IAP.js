Ext.define('ASLKids.controller.IAP', {
     extend: 'Ext.app.Controller',

     requires: ['ASLKids.view.IAPConfirm'],

     config: {
          identifier: 'com.basvanderwilk.aslkids.50signs',

          setup: false,
          ready: false,
          purchased: false
     },

	init: function() {
          var me = this;

          if (window.store) {
               me.setReady(true);
               me.fireEvent('ready', me);
          }

          document.addEventListener('deviceready', function() {
              if (window.store) {
                   me.setReady(true);
                   me.fireEvent('ready', me);
              }
         }, false);
	},

     getPurchased: function() {
          if (localStorage.getItem('purchased') === "true") {
               this._purchased = true;
               return true;
          }

          return this._purchased;
     },

     setup: function() {
          var me = this;

          if (me.getSetup()) {
               return;
          }

          me.setSetup(true);

          // Check availability of the storekit plugin
          if (!window.store) {
               console.log("window.store not found");
               return;
          }

          store.verbosity = store.INFO;
      
          // store.when(this.getIdentifier()).owned(function(product) {
          //      console.log('owned');
          //      console.log(arguments);
          // });
      
          store.when(this.getIdentifier()).approved(function(order) {
               console.log('# approved');
               console.log(arguments);

               order.finish();
          });
      
          store.when(this.getIdentifier()).cancelled(function(product) {
               console.log('cancelled');
               console.log(arguments);
          });
      
          store.when(this.getIdentifier()).error(function(product) {
               console.log('error');
               console.log(arguments);
          });
      
          store.when(this.getIdentifier()).updated(function(product) {
               console.log('updated');
               console.log(arguments);

               if (product.owned) {
                    me.setPurchased(true);
                    me.fireEvent('purchase', me);

                    localStorage.setItem('purchased', true);
               } else {
                    me.setPurchased(false);

                    localStorage.setItem('purchased', true);
               }

               me.fireEvent('updated', product);
          });

          store.register({
               id: me.getIdentifier(),
               type: store.NON_CONSUMABLE
          });

          store.refresh();
     },

     purchase: function() {
          var panel = Ext.create('ASLKids.view.IAPConfirm', {
               listeners: {
                    scope: this,
                    confirmed: this._purchase
               }
          });

          Ext.Viewport.add(panel);
          panel.show();
     },

     _purchase: function() {
          console.log('#_purchase');
          var me = this;

          if (window.store) {
               store.ready(function() {
                    console.log('# ready...');

                    store.order(me.getIdentifier());
               });

               me.setup();
          }
     },

     restorePurchases: function() {
          console.log('#restorePurchases');
          var me = this;

          if (window.store) {
               store.ready(function() {
                    console.log('# ready...');

                    store.refresh();
               });

               me.setup();
          }
     }
});