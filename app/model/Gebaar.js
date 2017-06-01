Ext.define('ASLKids.model.Gebaar',{
    extend: 'Ext.data.Model',
    config:{
        idProperty: 'Id',
        useCache: true, // is this causing the empty list page after some time???
        // I followed these performance tips https://mitchellsimoens.com/tiny-performance-boost-in-data-drive-ext-jssencha-touch-apps/
        fields:[
            { name: 'Id', type: 'int'},
            'plaatje',
            'cat'           
        ]
    }    
});


