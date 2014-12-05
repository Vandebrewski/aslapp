// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides
Ext.application({
    name: 'ASLKids',
    requires: [
        'Ext.MessageBox',
        'ASLKids.store.Gebaar',
        'ASLKids.view.Viewport',
        'ASLKids.view.Video',
        'Ext.Img',
        'Ext.Video',
        'Ext.Audio',
        'Ext.Button', // should this be placed in the view page??
        'Ext.carousel.Carousel', // should this be in it?
        'Ext.data.proxy.JsonP' // should this be in it?
    ],
    // models: ['Gebaar'],
    // stores: ['Gebaar'],
    controllers: ['Main', 'Quiz'],
    // views: ['Home', 'Card', 'NavList', 'Extra'],

    icon: {
        '60': 'resources/icons/icons-60.png',
        '120': 'resources/icons/icons-120.png',
        '76': 'resources/icons/icons-76.png',
        '152': 'resources/icons/icons-152@2x.png'
    },
    isIconPrecomposed: true,
    startupImage: {
        '640x1136': 'resources/icons/iphone5.png',
        '768x1024': 'resources/icons/768x1024.png',
        '1536x2048': 'resources/icons/768x1024.png'
    },

    launch: function () {
//        Ext.create('Test.view.Viewport'); I think this does exactly the same as underneath
        
        
        Ext.Viewport.add([{ xtype: 'main-view' },
        
        
        
        
        ]);


    }, // End launch
   
    onUpdated: function () {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function (buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
