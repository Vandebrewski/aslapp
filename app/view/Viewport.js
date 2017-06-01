Ext.define('ASLKids.view.Viewport', {
    extend: 'Ext.TabPanel',
    xtype: 'main-view',

    config: {
        tabBar: {
            hidden: true
        },

        layout: {
            animation: {
                type: 'slide',
                duration: 5
            }
        },
        fullscreen: true, // test
        
        items: [
            {xtype: 'homepanel'}, 
            {xtype: 'navlist'}, 
            {xtype: 'quizpanel'}, 
            {xtype: 'extrapanel'},
            {xtype: 'fingerspelling'},
            {
                xtype: 'tabbar',
                docked: 'bottom',
                items: [
                    {
                        iconCls: 'menu',
                        handler: function() {
                            Ext.Viewport.toggleMenu('left');
                        }
                    }
                ]
            }
        ]//,

// removed swipe menu because it was interfering with carousel swipe page


//        listeners: {
//            swipe: {
//                element: 'element',
//                fn: function(event, node, options, eOpts) {
//                    if (event.direction == 'right') {
//                        Ext.Viewport.showMenu('left');
 //                   } else {
 //                       Ext.Viewport.hideMenu('left');
 //                   }
 //               }
 //           }
 //       }
    },

    doTabChange: function(tabBar, newTab) {
        var index = tabBar.indexOf(newTab);
        if (index > 0) {
            this.callSuper(arguments);
        }
    }
});
