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
                xtype: 'video',
                name: 'listDetailVideo',
                itemId: 'videoView',
                posterUrl: 'resources/images/playbutton.svg',          
                enableControls: false,
                flex: 1,
                                
                listeners: {                    
                   painted: function () {
                   		if (Ext.os.version.getMajor() > 7) {
						this.media.dom.load();
						}
 //                     this.media.dom.load(); // 
 //                    this.media.dom.setAttribute('webkit-playsinline', 'true'); //; // placed in the override so can be removed
 //                     this.media.dom.setAttribute('showlogo', 'false');    // doesn't work                                      
                   },
                                        
                    tap: {
                        fn: function () {                                                           
                            var me = this;                            
//                            me.media.dom.addEventListener("playing", function() { // wait for quicktime to be ready so it doesnt show quicktime logo
//								me.play();
//								}, true);  // or should this be false?                            
                            
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
