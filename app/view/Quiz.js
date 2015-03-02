Ext.define('ASLKids.view.Quiz', {
    extend: 'Ext.Container',
    xtype: 'quizpanel',
    fullscreen: true,
    

    config: {
        iconCls: 'home',
        cls: 'quizbackground',
        layout: 'card',

        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
//                html: 'Which sign is this?',
                itemId: 'quizTitle',
                cls:'quizTitle'
            }, 
            {
                itemId: 'questionView',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'dataview',
                        scrollable: false,
                        height: 298,
                        itemTpl: '<div class="quiz-options"><img src="resources/images/objects/thumbnails/{plaatje}.png" width="150">{plaatje}</div>'
                	},
                    {
                        xtype: 'spacer'
                    }
            	]
            },
            {
                itemId: 'resultsView',
                items: [
                    {
                        itemId: 'resultsText'
                    }, {
                        xtype: 'button',
                        cls:'again',
                        itemId: 'repeatButton',
                        text: 'do it again'
                    }
                ]
            }
        ]
    }
})

