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
        'Ext.Button',
		'Ext.Menu',
		'Ext.TitleBar',
        'Ext.data.proxy.JsonP'
    ],

    controllers: ['Main', 'Quiz'],

    icon: {
        '29': 'resources/icons/icons-29.png',
        '40': 'resources/icons/icons-40.png',
        '76': 'resources/icons/icons-76.png',
        '80': 'resources/icons/icons-80.png',
        '152': 'resources/icons/icons-152@2x.png'
    },
    isIconPrecomposed: true,
    startupImage: {
        '768x1024': 'resources/icons/splash.png',
        '1536x2048': 'resources/icons/splash.png'
    },

    launch: function () {
        Ext.Viewport.add({
            xtype: 'main-view'
        });
        
        

        // Create native side menu
        var sideMenu = Ext.create('Ext.Menu', {
            layout: 'fit',            
            width: 220,
            id: 'nav-menu',
            items: [           
            {
                xtype: 'titlebar',
                docked: 'top',
                cls: 'menutitle'
            },                
            {
                xtype: 'list',
                itemTpl: '{title}',
                scrollable: false,
                height: '1024',
                data: [{
                    title: '<div class="menuHome">Home<br/><br/><span class="menu-icon-big">&#xe900;</span></div>',
                    itemIndex: 0
                }, {
                    title: '<div class="menuList">Signs<br/><br/><span class="menu-icon-big">&#xe600;</span></div>',
                    itemIndex: 1
                }, {
                    title: '<div class="menuQuiz">Play<br/><br/><span class="menu-icon-big">&#xe9df;</span></div>',
                    itemIndex: 2
                }, {
                    title: '<div class="menuInfo">Info<br/><br/><span class="menu-icon-big">&#xe601;</span></div>',
                    itemIndex: 3,
                    iconCls: 'info'
                }]
            }]
        });

        // Add side menu to viewport
        Ext.Viewport.setMenu(sideMenu, {
            side: 'left',
            reveal: true
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
