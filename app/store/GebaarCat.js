Ext.define('ASLKids.store.GebaarCat',{
    extend: 'Ext.data.Store',
    config: {
        fields:['cat','Id','plaatje'],
        autoLoad: true,
        storeId:'gebaarCatStore',
        method : 'GET',
        sorters:"Id",
        proxy: {
            type: 'ajax',
            url: 'resources/images/GebarenCat.json',
            reader:{
                type: 'json',
                rootProperty: 'Gebaartje'
            }
        }
    }
});