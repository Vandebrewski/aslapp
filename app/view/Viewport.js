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
        {xtype: 'extrapanel'}
        ]
    }
});
