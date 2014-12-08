Ext.define('ASLKids.view.Viewport', {
    extend: 'Ext.TabPanel',
    xtype: 'main-view',
    

    config: {
        tabBar: {
            hidden: true
        },

        layout: {
//            type: 'card', does not have to be here
            animation: {
                type: 'slide',
                duration: 300
            }
        },
        
        items: [
            {xtype: 'homepanel'}, 
            {xtype: 'cardpanel'}, 
            {xtype: 'navlist'}, 
            {xtype: 'quizpanel'}, 
            {xtype: 'extrapanel'},
            {
                xtype: 'tabbar',
                docked: 'bottom',
                items: [
                    {
                        iconCls: 'search',
                        handler: function() {
                            Ext.Viewport.toggleMenu('left');
                        }
                    }
                ]
            }
        ],

        listeners: {
            swipe: {
                element: 'element',
                fn: function(event, node, options, eOpts) {
                    if (event.direction == 'right') {
                        Ext.Viewport.showMenu('left');
                    } else {
                        Ext.Viewport.hideMenu('left');
                    }
                }
            }
        }
    },

    doTabChange: function(tabBar, newTab) {
        var index = tabBar.indexOf(newTab);
        if (index > 0) {
            this.callSuper(arguments);
        }
    }
});
