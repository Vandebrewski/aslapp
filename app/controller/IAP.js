Ext.define('ASLKids.controller.IAP', {
     extend: 'Ext.app.Controller',

     requires: ['ASLKids.view.IAPConfirm'],

     config: {
          identifier: 'com.basvanderwilk.aslkids.50signs',

          setup: false,
          ready: false,
          purchased: false,
          canPurchase: false,
          price: null
     },

	init: function() {
          var me = this;

          if (window.store) {
               me.setup();
          }
          else {
               document.addEventListener('deviceready', function() {
                   if (window.store) {
                        me.setup();
                   }
              }, false);
          }
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
//               console.log("window.store not found");
               return;
          }

          store.verbosity = store.INFO;
      
          // store.when(this.getIdentifier()).owned(function(product) {
          //      console.log('owned');
          //      console.log(arguments);
          // });
      
          store.when(this.getIdentifier()).approved(function(order) {
//               console.log('# approved');
//               console.log(arguments);

               Ext.Msg.alert('', 'Thanks! The signs pack is restored!');

               order.finish();
          });
      
          store.when(this.getIdentifier()).cancelled(function(product) {
//               console.log('cancelled');
//               console.log(arguments);
          });
      
          store.when(this.getIdentifier()).error(function(product) {
//               console.log('error');
//               console.log(arguments);
          });
      
          store.when(this.getIdentifier()).updated(function(product) {
//               console.log('updated');
//               console.log(arguments);

               me.setCanPurchase(product.canPurchase);
               me.setPrice(product.price);

               if (product.owned) {
                    me.setPurchased(true);
                    me.fireEvent('purchase', me);

                    localStorage.setItem('purchased', true);
               } else {
                    me.setPurchased(false);

                    localStorage.setItem('purchased', false);
               }

               me.fireEvent('updated', product);
          });

          store.error(function() {
               me.setCanPurchase(false);
               me.setReady(true);
               me.fireEvent('ready', me);
          });

          store.register({
               id: me.getIdentifier(),
               type: store.NON_CONSUMABLE
          });

          store.ready(function() {
               me.setReady(true);
               me.fireEvent('ready', me);
          });

          store.refresh();
     },

     purchase: function() {
          var me = this;

          if (!me.getCanPurchase()) {
               Ext.Msg.alert('', 'Looks like you have disabled In App Purchase or have no internet. Please turn it on in Settings.app');
               return;
          }

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
               store.order(me.getIdentifier());
          }
     },

     restorePurchases: function() {
          if (!this.getCanPurchase() && !this.getPurchased()) {
               Ext.Msg.alert('', 'Looks like you have disabled In App Purchase or have no internet. Please turn it on in Settings.app');
               return;
          }

          console.log('#restorePurchases');
          var me = this;

          if (window.store) {
               store.refresh();
          }
     }
});