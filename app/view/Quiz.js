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
                		cls: 'quizvideoborderoverlay1'
                	},
                    {
                        xtype: 'dataview',
                        scrollable: false,
                        flex:6,
                        itemTpl: '<img src="resources/images/objects/thumbnails/{plaatje}.png">{plaatje}</div>',
                        cls: 'centerQuizOptions'                      
                	},
                	{
                		cls: 'quizvideoborderoverlay2'
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
                        itemId: 'repeatButton'
                    }
                ]
            }
        ]
    }
})

