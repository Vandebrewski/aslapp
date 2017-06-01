Ext.define('ASLKids.store.Gebaar',{
    extend: 'Ext.data.Store',
    config: {
        model: 'ASLKids.model.Gebaar',
        
       grouper: {
            property: 'cat',
            direction:'ASC'
        },
        
        autoLoad: true,
        storeId:'gebaarStore',
        method : 'GET',
        

        proxy: {
            type: 'ajax',
            url: 'resources/images/Gebaren.json',
            reader:{
                type: 'json',
                rootProperty: 'Gebaartje'
            }
        }
   },
   
    initialize: function() {
        this.callParent(arguments);

        var IAP = ASLKids.app.getController('IAP');
        if (IAP.getPurchased()) {
            this._onPurchase();
        }
        else {
            IAP.on('purchase', this._onPurchase, this);
        }
    },

    _onPurchase: function() {
        this.getProxy().setUrl('resources/images/Gebaren-purchased.json');
        this.load();
}
       
});