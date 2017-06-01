// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides
Ext.application({
    name: 'ASLKids',
    requires: [
        'Ext.MessageBox', //needed for quiz -answer pop up
        'ASLKids.store.Gebaar', //not needed for functioning
       'ASLKids.view.Viewport', //needed!
        'ASLKids.overrides.Video', // do we need this?
        'ASLKids.overrides.SizeMonitor', // do we need this? Prevents blank pages?
        'ASLKids.overrides.PaintMonitor', // do we need this? Prevents blank pages?
        'Ext.Img',
        'Ext.Video',
        'Ext.Audio',
        'Ext.Button',
//		'Ext.Menu',
//		'Ext.Carousel',
        'Ext.data.proxy.JsonP' // prevents emty list view?
    ],

    controllers: ['Main', 'Quiz','IAP'],

    eventPublishers: {
        touchGesture: {
            recognizers: {
                doubleTap : null,
                longPress : null,
                pinch : null,
                rotate : null
            }
        }
    },

    launch: function () {
        Ext.Viewport.add({
            xtype: 'main-view'
        });
        
        Ext.Viewport.innerElement.addCls('viewport-inner'); // Hardware Acceleration Trick 


        // Create native side menu
        var sideMenu = Ext.create('Ext.Menu', {
            layout: 'fit',
            width: 150,
			top: 0,
        	left: 0,
			bottom: 0,
			docked: 'left',
            id: 'nav-menu',
            items: [

            {
                xtype: 'list',
                itemTpl: '{title}',
                scrollable: false, //warning: This container is set to scrollable: false but has no specified height. You may need to set the container to scrollable: null or provide a height.
                data: [
                {
                    title: '<div class="menu-icon-big1">&#xe901;</div>signs',
                    itemIndex: 1
                },
                {
                    title: '<div class="menu-icon-big">&#xe023;</div>quiz',
                    itemIndex: 2
                },
                {
                    title: '<div class="menu-abc">abc</div>',
                    itemIndex: 4
                },
                {
                    title: '<div class="menu-icon-small">&#xe904;</div>',
                    itemIndex: 3
                },
                {
                    title: '<div class="menu-icon-small">&#xe905;</div>',
                    itemIndex: 0
                }
                ]
            }]
        });

        // Add side menu to viewport
        Ext.Viewport.setMenu(sideMenu, {
            side: 'left',
            reveal: true,    
        });
    } //, // End launch
});
