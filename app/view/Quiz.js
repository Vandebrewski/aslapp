Ext.define('ASLKids.view.Quiz', {
    extend: 'Ext.Container',
    xtype: 'quizpanel',
    fullscreen: true,

    config: {
        iconCls: 'home',
        scrollable: false,
        cls: 'tekstscreen',
        layout: 'card',

        items: [{
            itemId: 'questionView',
            layout: 'vbox',
            items: [{
                flex: 1,
                xtype: 'dataview',
                itemTpl: '<img src="resources/images/{plaatje}.png" width="150">{plaatje}'
            }]
        }, {
            itemId: 'resultsView',
            items: [{
                itemId: 'resultsText'
            }, {
                xtype: 'button',
                itemId: 'repeatButton',
                text: 'do it again'
            }]
        }]
    }
})

