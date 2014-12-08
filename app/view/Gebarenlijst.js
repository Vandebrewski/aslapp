Ext.define('ASLKids.view.Gebarenlijst', {
    extend: 'Ext.List',
    xtype: 'gebarenlijst',

    config: {
        cls: 'gebarenlijst',
        title: 'Dieren',
        scrollable: true,  
//        height: 1024,


        store: 'gebaarStore',//Ext.create('Test.store.Gebaar'),
        itemTpl: '<img src="resources/images/{plaatje}.png" width="150">{plaatje}'
//        onItemDisclosure: true // not needed anymore
    }
});

