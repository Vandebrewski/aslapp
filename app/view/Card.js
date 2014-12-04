Ext.define('ASLKids.view.Card', {
    extend: 'Ext.Carousel',
    id: 'gebarencarousel',
    xtype: 'cardpanel',
      requires: [
      'Ext.Video'
	],
    
    config: {      
//        title: 'Speel', // there doesn't need to be a title
        iconCls: 'star',
        indicator: false,
        direction: 'horizontal'
        // bufferSize: 0 //keep only 1 card in memory, the default is 1 
//        animation: {
//        	type: 'slide',
//        	duration: 600
//        } // End animation
    } // End config
});
