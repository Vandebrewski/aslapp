Ext.define('ASLKids.view.GebarenDetail', {
    extend: 'Ext.Container',
    xtype: 'gebarendetail',
    

    config: {
        cls: 'gebarendetail',

// swipe to next element
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
                 xtype: 'button',
                 itemId: 'backListButton',
                 cls: 'backListButton'
            },
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
// Android, beacause html5 audio is not supported, above function is for iOS. Remove above function (5 lines) and activate underneath function for android
/*
						handler: function playAudio(url) {
    						var my_media = new Media(this.__url);
    						my_media.play();
						}
*/
// end android
                       
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
// iOS
/*
           {
                cls: 'videoborderoverlay'
            },
*/            

// this button underneath is only for the Android native player
/*            {
               xtype: 'button',
                flex: 1,
                itemId: 'videoPlayButton',
                cls: 'videoPlayButton',
                handler: function() {
                    VideoPlayer.play(this.__url, {
                    });
                }
            },
*/            
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
//                            if (Ext.os.is.Android) {
//                                return;
//                            }

                            var me = this;
                            // Removed Pause function for now
//                            if (me.isPlaying()) {
//                                me.pause();

//                            } else {
//                                me.play();
//                            }
//							me.load();
							
							me.play();
                        }, // END addEventListener
                        element: 'element'
                    } // END tap
                } // END listeners
            } // END video

        ]
    }
});