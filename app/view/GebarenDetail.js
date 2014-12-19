Ext.define('ASLKids.view.GebarenDetail', {
    extend: 'Ext.Container',
    xtype: 'gebarendetail',

    config: {
        cls: 'gebarendetail',
    
        layout: {
            type: 'vbox',
            pack: 'end' // or maybe not?
            },
        items: [
            {
                xtype: 'image',
                name: 'listDetailImage',
                cls: 'listdetailimage',
                width: 768,
                height: 430
            },
            {
                xtype: 'button',
                itemId: 'backButton',
                cls: 'backButton' //,
//                pressedCls: 'backButton-pressed'
            },                         
            {
                xtype: 'button',
                itemId: 'nextButton',
                cls: 'nextButton' //,
//                pressedCls: 'nextButton-pressed'
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
                xtype: 'video',
                name: 'listDetailVideo',
                posterUrl: 'resources/images/poster-play-video.png',
                width: 768,
                height: 432,           
                enableControls: false,
                                
                listeners: {                    
//                    painted: function () {
//                        this.media.dom.load(); // for iOS8. Maybe in a conditional statement?
//                    },
                    tap: {
                        fn: function () {                                                           
                            var me = this;
                            
                            me.media.dom.addEventListener("playing", function() { // wait for quicktime to be ready so it doesnt show quicktime logo
								me.play();
								}, true);  
                            
                            
                            if (me.isPlaying()) {                                       
                                me.pause();
                            } else {                                  
                                me.play();
                            }                            
                        }, // END addEventListener
                        element: 'element'
                    } // END tap
                } // END listeners
            }, // END video
            {
                xtype: 'audio',
                name: 'listDetailAudio',
                hidden: true
            }
        ]
    }
});
