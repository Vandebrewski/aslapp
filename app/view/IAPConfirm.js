Ext.define('ASLKids.view.IAPConfirm', {
    extend: 'Ext.Panel',

    statics: {
        numbers: [
            "Zero",
            "One",
            "Two",
            "Three",
            "Four",
            "Five"
        ]
    },

    config: {
        modal: true,
        centered: true,
        cls: 'parentalgate',
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        items: [{
//            html: 'Complete the following quiz to buy the sign pack.<br /><br />'
            html: '<br /><br /><br /><br />'
        }, 
        
        {
        	xtype: 'button',
// 			text:'Cancel',
// 			ui:'confirm',
			cls:'closebutton',
            itemId: 'close-btn'
// 			action:'Cancel',
		},
        {
            html: 'Enter the numbers below:<br /><br />'
        }, {
            itemId: 'numbers'
        }, {
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            items: [
                {
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    defaults: {
                        xtype: 'button',
                        width: 70,
                        height: 70,
                        itemId: 'number-btn'
                    },
                    items: [
                        { text: '0' },
                        { text: '1' },
                        { text: '2' }
                    ]
                },
                {
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    defaults: {
                        xtype: 'button',
                        width: 70,
                        height: 70
                    },
                    items: [
                        { text: '3' },
                        { text: '4' },
                        { text: '5' }
                    ]
                }
            ]
        }],

        numbers: []
    },

    initialize: function() {
        this.callParent(arguments);

        this.setNumbers(this._randomNumbers());

        var me = this,
            numbersCmp = me.down('#numbers'),
            buttons = me.query('#number-btn');

        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];

            button.on('tap', function() {
                me._tapped(parseInt(this.getText()));
            });
        }

        var numbers = this.getNumbers(),
            html = "";

        for (var i = 0; i < numbers.length; i++) {
            html += '<span class="number ' + ASLKids.view.IAPConfirm.numbers[numbers[i]].toLowerCase() + '">' + ASLKids.view.IAPConfirm.numbers[numbers[i]] + '</span>';
        }

        numbersCmp.setHtml(html);

        this.down('#close-btn').on('tap', function() {
            this.hide();
            this.destroy();
        }, this);
    },

    _tapped: function(number) {
        var numbers = this.getNumbers();
        if (numbers[0] != number) {
            this.hide();

            Ext.Msg.alert(null, 'Oops,<br /><br />looks like you got it incorrect.<br /><br />Please, try again.');

            return;
        }

        var numbersCmp = this.down('#numbers'),
            text = ASLKids.view.IAPConfirm.numbers[number].toLowerCase(),
            numberEl = numbersCmp.element.down('.number:nth-child(' + (3 - (numbers.length - 1)) + ')');

        numberEl.addCls('active');

        if (numbers.length == 1) {
            numbers = [];

            this.fireEvent('confirmed', this);
            this.hide();
        }
        else {
            numbers = numbers.shift();
        }
    },

    _randomNumbers: function() {
        var count = 3,
            randoms = [];

        for (var i = 0; i < count; i++) {
            randoms.push(Math.floor(Math.random() * 6));
        }

        return randoms;
    }
});