Ext.define('ASLKids.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homepanel',
    fullscreen: true,

    config: {
//        title: 'Home', // there doesn't need to be a title
        iconCls: 'home',
        cls: 'tekstscreen',

        scrollable: false,
//        height: 980,
        

        items: [{
//            xtype: 'image',
            cls: 'fade-in',
//            flex: 2,
			html: '<center><object type="image/svg+xml" data="resources/images/girl.svg"></object></center>',

// This link to the cardpanel does not work and generates a warning
//			listeners: {
//                tap: function(){
//                    Ext.Viewport.setActiveItem({
//                        xtype: 'cardpanel'
//                    })
//                }
//            }
        }]
    }
})

