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
        Ext.Viewport.add({
            xtype: 'main-view'
        });

        // Create native side menu
        var sideMenu = Ext.create('Ext.Menu', {
            layout: 'fit',
            width: 220,
            items: [{
                xtype: 'titlebar',
                title: 'Side menu',
                docked: 'top'
            }, {
                xtype: 'list',
                itemTpl: '{title}',
                data: [{
                    title: 'Menu item 1'
                }, {
                    title: 'Menu item 2'
                },

                {
                    title: 'Menu item 3'
                }, {
                    title: 'Menu item 4'
                }]
            }]
        });

        // Add side menu to viewport
        Ext.Viewport.setMenu(sideMenu, {
            side: 'left',
            reveal: true
        });

        // Add button to navbar
        var tabBar = Ext.Viewport.query('tabbar')[0];
        tabBar.insert(0, {
            iconCls: 'search',
            handler: function() {
                Ext.Viewport.toggleMenu('left');
            }
        });
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
