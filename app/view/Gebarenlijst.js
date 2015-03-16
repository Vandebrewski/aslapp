Ext.define('ASLKids.view.Gebarenlijst', {
    extend: 'Ext.List',
    xtype: 'gebarenlijst',
    config: {
        cls: 'gebarenlijst',
        scrollable: true,        
		layout: 'fit',
        store: 'gebaarStore',
        itemTpl: '<img src="resources/images/objects/thumbnails/{plaatje}.png">{plaatje}',

        items: {
        	xtype: 'button',
        	docked: 'bottom',
        	itemId: 'buyButton',
        	disabled: true,
       		height: 70,
        	cls: 'listbuybutton',
        	handler: function () {
	       		ASLKids.app.getController('IAP').purchase();
			}
		}
    },

    initialize: function() {
        this.callParent(arguments);

        var IAP = ASLKids.app.getController('IAP');

        if (!IAP.getReady()) {
            IAP.on('ready', this._onReady, this);
        }
        else {
            this._onReady();
        }

        if (!IAP.getPurchased()) {
            IAP.on('purchase', this._onPurchase, this);
        }
        else {
            this._onPurchase();
        }
    },

    getBuyButton: function() {
        return this.getComponent('buyButton');
    },

    _onReady: function() {
        this.getBuyButton().setDisabled(false);
    },

    _onPurchase: function() {
        this.getBuyButton().setHidden(true);
    }
});

