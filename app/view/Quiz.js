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
                html: 'Which sign is this?',
                itemId: 'quizTitle',
                cls:'quizTitle'
            }, 
            {
                itemId: 'questionView',
                layout: 'vbox',
                items: [
                    {
                        flex: 1,
                        xtype: 'dataview',
                        scrollable: false,
                        height: 488,
                        itemTpl: '<div class="quiz-options"><img src="resources/images/objects/thumbnails/{plaatje}.png" width="150">{plaatje}</div>'
                	},
                    {
                		cls: 'quizvideoborderoverlay' 
            		},
            		{
                		cls: 'quizvideoborderoverlay2' 
            		}
            	]
            }, {
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

