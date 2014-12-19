Ext.define('ASLKids.controller.Main', {
    extend: 'Ext.app.Controller',
    fullscreen: false,

    config: {
        models: ['Gebaar'],
        stores: ['Gebaar'],
        views: ['Home', 'NavList', 'Extra'],
        refs: {
            main: 'navlist',
//            cardpanel:'cardpanel',
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

            'gebarendetail #backButton': {
                tap: 'onBackTap'
            },
            'gebarendetail #nextButton': {
                tap: 'onNextTap'
            },
            'gebarenlijst': {
                itemtap: 'showDetail'
            }
        } // End control
    }, // End config

    onNavMenuSelect: function(view, record) {
        var itemIndex = record.get('itemIndex'); 
        Ext.Viewport.child('tabpanel').setActiveItem(parseInt(itemIndex));

        // Hide the menu?
        Ext.Viewport.toggleMenu('left');
    },

    onBackTap: function() {
        this.getMain().setActiveItem(0);
    },

    onNextTap: function() {
        var me = this,
            store = Ext.getStore('gebaarStore'),
            index = store.indexOf(me.currentDetailRecord);

        index++;

        if (index == store.getCount()) {
            index = 0;
        }

        var record = store.getAt(index),
            detail = me.getDetail(),
            video = detail.down('video');
            
//        video.stop();
		video.pause();
        video.setUrl(null);

        setTimeout(function() {
            me.showDetail(null, null, null, record);
            video.media.dom.load();
        }, 150);
    },

    showDetail: function (view, index, target, record) {
        var me = this,
            detail = this.getDetail();

        me.getListDetailVideo().setUrl("resources/video/" + record.data.plaatje + ".mp4");
        me.getListDetailAudio().setUrl("resources/audio/" + record.data.plaatje + ".m4a");
        me.getListDetailButton().setText(record.data.plaatje);
        me.getListDetailImage().setSrc("resources/images/objects/" + record.data.plaatje + ".png");
     
        me.getMain().setActiveItem(detail);

        me.currentDetailRecord = record;

        setTimeout(function() {
            me.getListView().deselectAll();
        }, 100);
    }



});

