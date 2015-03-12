Ext.define('ASLKids.view.Gebarenlijst', {
    extend: 'Ext.List',
    xtype: 'gebarenlijst',
    config: {
        cls: 'gebarenlijst',
        scrollable: true,        
		layout: 'fit',
        store: 'gebaarStore',
        itemTpl: '<img src="resources/images/objects/thumbnails/{plaatje}.png">{plaatje}'
    }
});

