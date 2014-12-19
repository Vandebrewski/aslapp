Ext.define('ASLKids.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homepanel',
    fullscreen: true,
    id: 'home',


    config: {
        iconCls: 'home',
        cls: 'tekstscreen',
        scrollable: false,
        height: 976,
        items: [{       	
            cls: 'fade-in',
			html: '<img src="resources/images/homescreen.png" height="976" width="768">'
        }]
    }
})

