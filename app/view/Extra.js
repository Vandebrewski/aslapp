Ext.define('ASLKids.view.Extra', {
    extend: 'Ext.Container',
    xtype: 'extrapanel',

    config: {
        iconCls: 'info',
        styleHtmlContent: true,
        cls: 'infoscreen',
        scrollable: true,
        items: [
        {
        	xtype: 'spacer',
        	height: 10
        },
        {
            xtype: 'button',
            itemId: 'buyButton',
            cls: 'listbuybutton',
            disabled: true,
            text: 'Get 50 more Signs ',
            height: 70,
            handler: function () {
                ASLKids.app.getController('IAP').purchase();
            }
        },
        {
        	xtype: 'spacer',
        	height: 10
        },
        {
        	xtype: 'button',
            itemId: 'restoreButton',
            cls: 'restoreButton',
            disabled: true,
        	text: 'Restore previous purchases',
        	height: 70,
        	handler: function () {
        		ASLKids.app.getController('IAP').restorePurchases();
        	}
        },
        {
        	xtype: 'spacer',
        	height: 20
        },
        {
            html: '<h4>ver 1.1 - asl-kids.com</h4><h3>Learn ASL in a Fun & Easy way</h3>This app comes with 21 free signs and an optional pack of 50 extra signs that are easy to learn for young children. The signs are demonstrated by (relatives of) children who are hard of hearing. The app is kid-proof and was designed to be used without the help of an adult. There are no external links or ads so no internet connection is needed. No complex text, but clear and tappable images.<br /><br />Why this app? When our son was identified with a hearing loss, our whole family was eager to learn sign language. We discovered that our kids benefited from interactive visual material. However, it was hard to find suitable apps on signing specifically designed for kids. So we decided to design one ourselves. The aim was to develop an app that is appealing, instructive and most of all FUN! How do children learn best? By imitating other kids! Our son loves it. We hope you will too.<br /><br /><strong>Support</strong><br />We are dedicated to creating and expanding a high-quality app that unlocks your child’s learning potential in a fun way. If you have reinstalled the app, just tap the restore purchases button on top. If you have any issues, please mail us at info@asl-kids.com<br /><br />Tips for improvement? Go to asl-kids.com and let us know.<br /><br />Activate the 50 extra signs and continue to increase your knowledge of ASL.<br /><br />',
            cls:'infotext'
        }]
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

    getRestoreButton: function() {
        return this.getComponent('restoreButton');
    },

    _onReady: function() {
        var IAP = ASLKids.app.getController('IAP'),
            buyBtn = this.getBuyButton();

        buyBtn.setText('Get 50 more Signs ' + IAP.getPrice());

        buyBtn.setDisabled(false);
        this.getRestoreButton().setDisabled(false);
    },

    _onPurchase: function() {
        this.getBuyButton().setHidden(true);
    }
});
