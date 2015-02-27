Ext.define('ASLKids.view.Gebarenlijst', {
    extend: 'Ext.List',
    xtype: 'gebarenlijst',

    config: {
        cls: 'gebarenlijst',
        title: 'Dieren',
        scrollable: true,  
//        height: 1024,


        store: 'gebaarStore',//Ext.create('Test.store.Gebaar'),
        itemTpl: '<img src="resources/images/objects/thumbnails/{plaatje}.png" class="objectimages">{plaatje}'
//        onItemDisclosure: true // not needed anymore
    }
});

