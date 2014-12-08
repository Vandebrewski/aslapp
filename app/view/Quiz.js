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
                itemTpl: '<center><div class="quiz-options"><img src="resources/images/{plaatje}.png" width="150">{plaatje}</div></center>'
            }]
        }, {
            itemId: 'resultsView',
            items: [{
                itemId: 'resultsText'
            }, {
                xtype: 'button',
                cls:'again',
                itemId: 'repeatButton',
                text: 'do it again'
            }]
        }]
    }
})

