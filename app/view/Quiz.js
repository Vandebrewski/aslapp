Ext.define('ASLKids.view.Quiz', {
    extend: 'Ext.Container',
    xtype: 'quizpanel',
    fullscreen: true,
    

    config: {
        iconCls: 'home',
//        scrollable: false,
//        height: 976,
        cls: 'quizbackground',
        layout: 'card',

        items: [{
            xtype: 'toolbar',
            docked: 'top',
            itemId: 'quizTitle',
            html: 'WHICH SIGN IS THIS?',
            cls:'quizTitle'
        }, {
            itemId: 'questionView',
            layout: 'vbox',
            items: [{
                flex: 1,
                xtype: 'dataview',
                scrollable: false,
                height: 976,
                itemTpl: '<center><div class="quiz-options"><img src="resources/images/objects/{plaatje}.png" width="150">{plaatje}</div></center>'
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

