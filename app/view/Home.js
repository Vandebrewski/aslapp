Ext.define('ASLKids.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homepanel',
    fullscreen: true,

    config: {
        iconCls: 'home',
        cls: 'homescreen',
        scrollable: null,

		listeners:[
                 {
                    element: 'element',
                    event: 'tap',
                    fn: function() {
                        Ext.Viewport.toggleMenu('left');
                    }
                }
            ]

//        items: [
//		{
// FOR ANDROID:			
//			html: '<audio autoplay><source src="/android_asset/www/resources/audio/soundsapp/start.mp3"></source></audio>'
// for iOS			
//			html: '<audio autoplay><source src="resources/audio/soundsapp/start.mp3"></source></audio>'
//		}

//	]
    }
})
