Ext.define('ASLKids.view.GebarenDetail', {
    extend: 'Ext.Container',
    xtype: 'gebarendetail',

    config: {
        cls: 'gebarendetail',

        listeners: {
            initialize: function(c) {
                var me = this;

                me.element.on({
                    swipe: function(e, node, options) {
                        if (e.direction == "left") {
                            me.fireEvent('swipeleft', me);
                        }
                    }
                });
            }
        },

        layout: {
    		type: 'vbox',
    		align: 'stretch',
    		pack: 'end'
			},
        items: [
            {
                xtype: 'image',
                name: 'listDetailImage',
               flex: 1,
                cls: 'listdetailimage'
            },
            {
                layout: 'hbox',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        itemId: 'listDetailButton',
                        cls: 'audioButton',
                        handler: function () {
                            var container = this.getParent(),
                            audio = container.down('audio');
                            audio.play();
                        }
                    },
                	{
                		xtype: 'audio',
                		name: 'listDetailAudio',
                		hidden: true
            		},

                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backButton',
                        cls: 'backButton'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        itemId: 'nextButton',
                        cls: 'nextButton'
                    }
                ]
            },
            {
                cls: 'videoborderoverlay'
            },
            {
                xtype: 'button',
                height: 200,
                text: 'play video',
                itemId: 'videoPlayButton',
                handler: function() {
                    VideoPlayer.play(this.__url, {
                        volume: 0.5
                    },
                    function () {
                        console.log("video completed");
                    },
                    function (err) {
                        console.log(err);
                    });
                }
            },
            {
                xtype: 'video',
                name: 'listDetailVideo',
                itemId: 'videoView',
                posterUrl: 'resources/images/playbutton.svg',
                enableControls: false,
                flex: 1,

                listeners: {

                    tap: {
                        fn: function (e) {
                            if (Ext.os.is.Android) {
                                return;
                            }

                            var me = this;
                            if (me.isPlaying()) {
                                me.pause();

                            } else {
                                me.play();
                            }
                        }, // END addEventListener
                        element: 'element'
                    } // END tap
                } // END listeners
            } // END video

        ]
    }
});
