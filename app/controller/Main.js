Ext.define('ASLKids.controller.Main', {
    extend: 'Ext.app.Controller',
    fullscreen: false,

    config: {
        models: ['Gebaar'],
        stores: ['Gebaar'],
        views: ['Home', 'NavList', 'Extra'],
        refs: {
            'videoView': 'gebarendetail #videoView',
            main: 'navlist',
            listView: 'gebarenlijst',
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

            'gebarendetail': {
                swipeleft: 'onNextTap'
            },
            'gebarendetail #backButton': {
                tap: 'onBackTap'
            },
            'gebarendetail #nextButton': {
                tap: 'onNextTap'
            },
            'gebarenlijst': {
                itemtap: 'showDetail'
            },

            'videoView': {
                ended: 'onVideoEnded'
            }
        } // End control
    }, // End config
    
	
	

    onVideoEnded: function(video) {
        video.media.setBottom(-2000);
        video.ghost.show();
        var video = this.getVideoView();
        if (video.media.pause) { // fix for: the .paused flag remains false when the media has ended. But it also causes an error in browser console
            video.media.pause(); 
           }
    },
	
	
    onNavMenuSelect: function(view, record) {
        var itemIndex = record.get('itemIndex'); 
        Ext.Viewport.child('tabpanel').setActiveItem(parseInt(itemIndex));

        // Hide the menu?
        Ext.Viewport.toggleMenu('left');
    },

    onBackTap: function() {
        this.getMain().setActiveItem(0);
        this.getVideoView().pause();       
    },

    onNextTap: function() {
        var me = this,
            store = Ext.getStore('gebaarStore'),
            index = store.indexOf(me.currentDetailRecord);

        index++;

        if (index === store.getCount()) {
            index = 0;
        }

        var record = store.getAt(index),
            detail = me.getDetail(),
            video = detail.down('video');  

        video.media.hide();
        video.pause();
        video.setUrl(null);  

        setTimeout(function() {
            me.showDetail(null, null, null, record);
//            video.media.dom.load(); // this is needed for ios8 try a conditional statement
			video.ghost.show();
        }, 150);
    },

    showDetail: function (view, index, target, record) {
        var me = this,
            detail = this.getDetail();

        me.getListDetailImage().setSrc("resources/images/objects/" + record.data.plaatje + ".svg");
         me.getListDetailVideo().setUrl("resources/video/" + record.data.plaatje + ".mp4");
//        me.getListDetailVideo().setUrl("android.resource://com.basvanderwilk.aslkids/raw/" + record.data.plaatje); // maybe add /res before /raw
        me.getListDetailAudio().setUrl("resources/audio/" + record.data.plaatje + ".m4a");
        me.getListDetailButton().setText(record.data.plaatje);
     
        me.currentDetailRecord = record;
        me.getMain().animateActiveItem(detail, {type: 'fade', duration: 250});

        setTimeout(function() {
            me.getListView().deselectAll();
        }, 150);
    }
});

