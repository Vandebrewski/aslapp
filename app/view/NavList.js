Ext.define('ASLKids.view.NavList', {
    extend: 'Ext.Container',
    xtype: 'navlist',

    requires: [
        'ASLKids.view.Gebarenlijst',
        'ASLKids.view.GebarenDetail'
    ],

    config: {
        layout: 'card',
//        title: '',
        iconCls: 'search',
//        id: 'navlistCardView',
        // useTitleForBackButtonText: 'true', // true causes the back tekst to be something else than "back"
        items: [{
            xtype: 'gebarenlijst'
        }, {
            xtype: 'gebarendetail'
        }]
    }
});