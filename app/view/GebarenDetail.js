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
        } ,
    
        layout: {
            type: 'vbox',
           pack: 'right'
            },
        items: [
            {
                xtype: 'image',
                name: 'listDetailImage',
                flex: 1,
                cls: 'listdetailimage'
            },
            {
                xtype: 'button',
                itemId: 'nextButton',
                cls: 'nextButton' //,
//                pressedCls: 'nextButton-pressed'
            }, 
            {
                xtype: 'button',
                itemId: 'backButton',
                cls: 'backButton'
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
                xtype: 'image',
//                cls: 'videoborderoverlay' 
            },
            {
                xtype: 'video',
                flex: 1,
                name: 'listDetailVideo',
                itemId: 'videoView',
                posterUrl: 'resources/images/playbutton.svg',          
                enableControls: false,
                                
                listeners: {                    
                    painted: function () {
                        this.media.dom.load(); 
                       this.media.dom.setAttribute('webkit-playsinline', 'true'); // make it play inline on iphone                                             
                    },
                                        
                    tap: {
                        fn: function () {                                                           
                            var me = this;                            
                            me.media.dom.addEventListener("playing", function() { // wait for quicktime to be ready so it doesnt show quicktime logo
								me.play();
								}, true);  // or should this be false?
                            
                            
                            if (me.isPlaying()) {                                       
                                me.pause();
//								me.media.setTop(-2000); // this doesn't work
//            					me.ghost.show(); // this doesn't work
                                
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
