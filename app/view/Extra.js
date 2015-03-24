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
            text: 'Activate 50 more Signs ',
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
            html: '<p style="margin: 20px 10px 0 10px !important"><h3>Learn ASL in a fun way</h3>This app contains over 50 signs (more to come) that are easy to learn for young children. The signs are demonstrated by (relatives of) children who are hard of hearing. The app is kid-proof and was designed to be used without the help of an adult. There are no external links or ads so no internet connection is needed. No complex text, but clear and tappable images.  <br /><br />Why this app? When my son was identified with hearing loss, our whole family was eager to learn sign language. We discovered that our kids benefited from interactive visual material. However, it was hard to find suitable apps on signing specifically designed for kids. So I decided to design one myself. I developed an app that is appealing, instructive and most of all FUN! How do children learn best? By watching other kids! My son loves it. I hope you will too.<br /><br /><strong>Support</strong><br />We are dedicated to creating and expanding a quality app that unlocks your child’s learning potential in a fun way.<br /><br />Tips for improvement? Go to asl-kids.com and let us know.</p>'
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

        buyBtn.setText('Buy 50 signs for ' + IAP.getPrice());

        buyBtn.setDisabled(false);
        this.getRestoreButton().setDisabled(false);
    },

    _onPurchase: function() {
        this.getBuyButton().setHidden(true);
    }
});
