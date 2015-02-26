Ext.define('ASLKids.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homepanel',
    fullscreen: true,


    config: {
        iconCls: 'home',
        cls: 'homescreen',
        scrollable: false,
//        height: 975,
        items: [
        {       	
			html: 'Menu<br />&#x25BC;',
			cls: 'menu-hint'
			}
			]
    }
})

