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
/*
// iOS
                   {
                		cls: 'quizvideoborderoverlay1'
                	},
// END IOS
*/                	
                    {
                        xtype: 'dataview',
                        scrollable: null,
                        flex:6,
                        itemTpl: '<img src="resources/images/objects/{plaatje}.svg">{plaatje}</div>',
                        cls: 'centerQuizOptions'
                	},
/*
// iOS
                	{
                		cls: 'quizvideoborderoverlay2'
                	},
// END IOS
*/                	
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
                    },
                    {
                        xtype: 'button',
                        cls:'again',
                        itemId: 'repeatButton'
                    }
                ]
            }
        ]
    }

});
