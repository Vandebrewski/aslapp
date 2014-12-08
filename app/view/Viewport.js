Ext.define('ASLKids.view.Viewport', {
    extend: 'Ext.TabPanel',
    xtype: 'main-view',
    

    config: {
        tabBarPosition: 'bottom',
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
            {xtype: 'extrapanel'}
        ],

        listeners: {
            swipe: {
                element: 'element',
                fn: function(event, node, options, eOpts) {
                    console.log('?');
                    if (event.direction == 'right') {
                        Ext.Viewport.showMenu('left');
                    } else {
                        Ext.Viewport.hideMenu('left');
                    }
                }
            }
        }
    }
});
