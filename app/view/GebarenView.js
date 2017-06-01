Ext.define('ASLKids.view.GebarenView', {
    extend:'Ext.Container',
    requires:[
        'ASLKids.view.Gebarenlijst'
    ],
    xtype:'gebarenview',
    config:{
        cls:'gebarenview',
        layout:'card',
        activeItem:0,
        items:[
            {
                xtype:'dataview',
                name:'catsview',
                cls:'gebarencat gebarenlijst',
                itemTpl:'<img src="resources/images/objects/{plaatje}.svg">{cat}'
            },
			{
        	xtype: 'button',
        	docked: 'bottom',
        	itemId: 'buyButton',
//        	disabled: true,
       		height: 85,
        	cls: 'listbuybutton',
        	text:'',
        	handler: function () {
	       		ASLKids.app.getController('IAP').purchase();
			}   			
		},
            
            
            {
                xtype:'container',
                name:'catitemscnt',
                scrollable: false,
                fullscreen: true,
//                scroll: 'vertical',
                cls:'catitemscnt',
                layout: 'fit',
                items:[
                    //{
                    //    xtype:'component',
                    //    name:'catitemtitle',
                    //    cls:'catitemtitle',
                    //    tpl:'<div cls="gebarencatname">{catname}</div>',
                    //    data:{
                    //        catname:""
                    //    }
                    //},
                    {
                        xtype:"titlebar",
                        cls:"catitemtitle",
                        name:'catitemtitle',
                        docked:'top',
                        title:"",
                        items:[
                            {
                                //xtype: 'button',
                                name: 'catslit',
                                align:'left',
                                text:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                                cls: 'arrow_left'
                            }
                        ]
                    },
                    {
                        xtype:'gebarenlijst'
                    }
                ]
            }
        ]
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
        var IAP = ASLKids.app.getController('IAP'),
            buyBtn = this.getBuyButton();

        buyBtn.setText('Get 50 more Signs ' + IAP.getPrice());

        buyBtn.setDisabled(false);
    },

    _onPurchase: function() {
        this.getBuyButton().setHidden(true);
}
});