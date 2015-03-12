Ext.define('ASLKids.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homepanel',
    fullscreen: true,

    config: {
        iconCls: 'home',
        cls: 'homescreen',
        scrollable: false,

		listeners:[
                 {
                    element: 'element',
                    event: 'tap',
                    fn: function() {
                       Ext.Viewport.toggleMenu('left');
                    }
                }
            ],

        items: [
//        {
//    		xtype: 'audio',
//    		src: 'resources/audio/home-sample.mp3',
//    		enableControls: true,
//    		autoplay:true
//    		hidden: true    		
//    	}, 
        {       	
			html: 'Menu<br />&#x25BC;',
			cls: 'menu-hint'
		}
		
	]
    }
})

