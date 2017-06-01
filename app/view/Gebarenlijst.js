
Ext.define('ASLKids.view.Gebarenlijst', {
    extend: 'Ext.dataview.DataView', // or should I use Ext.List instead of Ext.dataview.List
    xtype: 'gebarenlijst',
    
    fullscreen: true, // fix scroll issue?
    config: {
        cls: 'gebarenlijst',
       	//grouped: true,
        //scrollable: true,
        //scroll: 'vertical',
		//layout: 'fit',
        store:'gebaarStore',
//       cover: true,
        
        itemTpl: '<img src="resources/images/objects/{plaatje}.svg">{plaatje}',
        
        
        
    }
});