Ext.define('ASLKids.controller.Main', {
    extend: 'Ext.app.Controller',
    fullscreen: false,

    config: {
        models: ['Gebaar'],
        stores: ['Gebaar'],
        views: ['Home', 'Card', 'NavList', 'Extra'],
        refs: {
            main: 'navlist',
            cardpanel:'cardpanel',
            listDetailAudio  : 'gebarendetail audio[name="listDetailAudio"]',
            listDetailButton : '#listDetailButton',
            listDetailVideo  : 'gebarendetail video[name="listDetailVideo"]',
            listDetailImage  : 'gebarendetail image[name="listDetailImage"]',
            detail: 'gebarendetail'
        }, // End refs

        control: {
            // Menu
            '#nav-menu list': {
                select: 'onNavMenuSelect'
            },

            'gebarendetail #backButton': {
                tap: 'onBackTap'
            },
            'gebarenlijst': {
                itemtap: 'showDetail'
            },            
        	cardpanel:{
                initialize: 'initializeCzrosal',

                activeitemchange: function(carousel, newItem, oldItem) {
                    if (!oldItem) {
                        return;
                    }

                    var video = oldItem.down('video');
                    if (video) {
                        video.stop();
                    }
                }


           } // End Cardpanel
        } // End control
    }, // End config

    onNavMenuSelect: function(view, record) {
        var action = record.get('action'); 
        if (action && this[action]) {
            this[action]();
        }
    },

    doSomething: function() {
        console.log('doSomething');
    },

    doSomethingElse: function() {
        console.log('doSomethingElse');
    },

    onBackTap: function() {
        this.getMain().setActiveItem(0);
    },

    showDetail: function (view, index, target, record) {
        var me = this,
            detail = this.getDetail();

        me.getListDetailVideo().setUrl("resources/images/" + record.data.plaatje + ".mp4");
        me.getListDetailAudio().setUrl("resources/images/" + record.data.plaatje + ".mp3");
        me.getListDetailButton().setText(record.data.plaatje);
        me.getListDetailImage().setSrc("resources/images/" + record.data.plaatje + ".png");
     
        this.getMain().setActiveItem(detail);
    },

//-------------- CAROUSEL-------------------------------------------
    initializeCzrosal:function(){
        var me = this;
        Ext.getStore('gebaarStore').onAfter('load', function(store,data){
            var itemObjs = [];
            itemObjs.push({


                items: [{
                    html: '<div><img src="resources/images/swipe-tekst.png"><img src="resources/images/swipe-arrow.png" class="swipe-animation"><img src="resources/images/home-logo-kleiner.png" width="100%"></div>'
                }]
            }); // END first intro item 

            
            var totalcount = data.length;
            for (var i = 0; i < totalcount; i++) {                                
                var objectname = data[i].get('plaatje');               
                var itemTmpObj = {

//-------------- Start carousel item content panel ------------------
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    items: [{
                        xtype: 'image',
                        src: 'resources/images/' + objectname + '.png',
                        cls: 'mainimage',
                        width: 768,
                        height: 430
                    }, 
                    {
                        xtype: 'button',
                        cls: 'audioButton',
                        text: objectname,
                        handler: function () {
                            var container = this.getParent(),
                            audio = container.down('audio');
                            audio.play();
                        }      
                    },
                    {
                        xtype: 'audio',
                        url: 'resources/images/' + objectname + '.mp3',
                        hidden: true                        
                    },  
                    {
                        xtype: 'button',
                        cls: 'play-video-button',
                        width: 768,
                        height: 432,
                        url: "resources/images/" + objectname + ".mp4",
                        listeners: {
                            tap: function() {           
          	
                                var modal = Ext.create('Ext.Panel', {
                                	id: 'videopanel',
									bottom : 49, 
                                    modal: true,
                                    width: 768,
                                    height: 432,
//                                    layout: 'fit',
                                    hideOnMaskTap: true,
                                    listeners: {
                                        hide: function() {    
                                            this.destroy();
                                            
                                        }
                                    },
                                    items: [
                                    	{
                                    	xtype: 'button',
//										 text:'sluit video',
										 cls: 'closepanel',
//										 width: 100,
//										 height: 60,
//										 action:'Cancel',
										 listeners : {
										     tap : function() {
										           var pnl = Ext.getCmp('videopanel');
										           pnl.hide();
										     }
										 }
										},
                                        {
											xtype: 'video',
                                            enableControls: true,
                                            url: this.initialConfig.url,
//                                            posterUrl: 'resources/images/play-video.png',
                                            itemId: 'filmpie',
                                            preload: true,
        									hidden: false,
                                                       

							                listeners: {                    
							                    painted: function () {
							                        this.media.dom.load(); // for iOS8. Maybe in a conditional statement?
//							                        this.media.dom.play();
													Ext.getCmp('filmpie').play();
													Ext.getCmp('filmpie').ghost.hide();
													Ext.getCmp('filmpie').media.show();
							                    },
                 
                                                tap: function () {                                                	                                                    
                                                    var me = this;
                                                    
                                                    me.media.dom.addEventListener("playing", function() { // wait for quicktime to be ready so it doesnt show quicktime logo
													me.play();
													}, true);     

                                                    if (me.isPlaying()) {                                       
                                                       me.pause();
                                                    } else {                                  
                                                        me.play();
                                                    }
                                                                          
                                                },
                                            element: 'element'    
                                            }
                                        } // END xtype video
                                    ]
                                });

                                Ext.Viewport.add(modal);
                                modal.show();
                            }
                        }
                    }] // END video
//-------------- END carousel item content panel ------------------
                }  // End of var itemTmpObj
            
                itemObjs.push(itemTmpObj);                
                
            } // End of loop
            me.getCardpanel().setItems(itemObjs);
       }); 
    }
});

