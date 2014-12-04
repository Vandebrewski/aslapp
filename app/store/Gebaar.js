Ext.define('ASLKids.store.Gebaar',{
    extend: 'Ext.data.Store',
    config:{
        model: 'ASLKids.model.Gebaar',
        autoLoad: true,
        sorters: 'plaatje',
        storeId:'gebaarStore',
        method : 'GET', // is this helpful?

        proxy:{
            type:'ajax',
            url:'resources/images/Gebaren.json',
            reader:{
                type: 'json',
                rootProperty: 'Gebaartje'
            }
        }


    }
});
