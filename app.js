// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides
Ext.application({
    name: 'ASLKids',
    requires: [
        'Ext.MessageBox',
        'ASLKids.store.Gebaar',
        'ASLKids.view.Viewport',
        'Ext.Img',
        'Ext.Video',
        'Ext.Audio',
        'Ext.Button',
		'Ext.Menu',
        'Ext.data.proxy.JsonP'
    ],

    controllers: ['Main', 'Quiz'],

//    icon: {
//        '29': 'resources/icons/icons-29.png',
//       '40': 'resources/icons/icons-40.png',
//        '57': 'resources/icons/icon.png',
//        '72': 'resources/icons/icons-72.png',
//        '76': 'resources/icons/icons-76.png',
//        '80': 'resources/icons/icons-80.png',
//        '152': 'resources/icons/icons-152@2x.png'
//    },
//    isIconPrecomposed: true,
//    startupImage: {
//        '768x1024': 'resources/icons/splash.png',
//        '1536x2048': 'resources/icons/splash.png'
//    },
    
    eventPublishers: {
        touchGesture: {
            recognizers: {
                doubleTap : null,
                longPress : null,
                pinch : null,
                rotate : null
            }
        }
    },
    



    // -------------------------------------- IAP --------------------------------------
    IAP = {
		list: [ "adfree"]
	};
	
	IAP.load = function () {
 
     // Check availability of the storekit plugin
     if (!window.storekit) {
          console.log("In-App Purchases not available");
          return;
     }
 
     // Initialize
     storekit.init({
          debug:    true, // Enable IAP messages on the console
          ready:    IAP.onReady,
          purchase: IAP.onPurchase,
          restore:  IAP.onRestore,
          error:    IAP.onError
     });
 
	}; // END IAP.load
	
	IAP.onReady = function () {
     storekit.load(IAP.list, function (products, invalidIds) {
          IAP.products = products;
          IAP.loaded = true;
          for (var i = 0; i < invalidIds.length; ++i) {
               console.log("Error: could not load " + invalidIds[i]);
          }
     });
	}; // END IAP.onready
	
	IAP.onPurchase = function (transactionId, productId, receipt) {
     if(productId === 'adfree'){
          alert("Ads Removed!");
          //Code to remove ads for the user
     }
	}; // END IAP.onpurchase function
	
	IAP.onRestore = function (transactionId, productId, transactionReceipt) {
     if(productId == 'adfree'){
          //Code to remove ads for the user
     }
	}; // END IAP.onRestore
	
	IAP.onError = function (errorCode, errorMessage) {
     console.log(errorCode);
     console.log(errorMessage);
	}; // END IAP.onError
	
	IAP.buy = function(productId){
     storekit.purchase(productId);
	}; // END IAP.buy
	
	IAP.restore = function(){
     storekit.restore();
	}; // END IAP
	
	// -------------------------------------- END IAP --------------------------------------
	
	




    
    launch: function () {
    	
        Ext.Viewport.add({
            xtype: 'main-view'
        });
        
       // 
        document.addEventListener("deviceready", function(){
     		IAP.load();
		}, false);
		
       
        // Create native side menu
        var sideMenu = Ext.create('Ext.Menu', {
            layout: 'fit',            
            width: 150,
            id: 'nav-menu',
            items: [           
               
            {
                xtype: 'list',
                itemTpl: '{title}',
                scrollable: false,
                data: [{
                    title: '<div class="menu-icon-big">&#xe604;</div>Home',
                    itemIndex: 0
                }, {
                    title: '<div class="menu-icon-big">&#xe603;</div>Signs',
                    itemIndex: 1
                }, {
                    title: '<div class="menu-icon-big">&#xe602;</div>Play',
                    itemIndex: 2
                }, {
                    title: '<div class="menu-icon-big">&#xe600;</div>Info',
                    itemIndex: 3
                }]
            }]
        });

        // Add side menu to viewport
        Ext.Viewport.setMenu(sideMenu, {
            side: 'left',
            reveal: true
        });
    } //, // End launch
});
