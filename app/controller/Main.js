Ext.define('ASLKids.controller.Main', {
    extend: 'Ext.app.Controller',
    fullscreen: false,

    config: {
        models: ['Gebaar'],
        stores: ['Gebaar','GebaarCat'],
        views: ['Home', 'NavList', 'Extra', 'Fingerspelling'],
        refs: {
            'videoView': 'gebarendetail #videoView',
            main: 'navlist',
            listView: 'gebarenlijst',
            listDetailAudio  : 'gebarendetail audio[name="listDetailAudio"]',
            listDetailButton : '#listDetailButton',
            listDetailVideo  : 'gebarendetail video[name="listDetailVideo"]',
            listDetailImage  : 'gebarendetail image[name="listDetailImage"]',
            detail: 'gebarendetail',
//            videoPlayButton: '#videoPlayButton',
            gebarenview:"gebarenview"
        }, // End refs

        control: {

            // Menu
            '#nav-menu list': {
                select: 'onNavMenuSelect'
            },
            'gebarenlijst': {
                itemtap: 'showDetail'
            },
            'gebarenview dataview[name=catsview]':{
                itemtap:'showCatItems'
            },
            'gebarenview button[name=catslit]':{
                tap:'backToCatsView'
            },
            'gebarendetail': {
                swipeleft: 'onNextTap'
            },
            'gebarendetail #backListButton': {
                tap: 'onBackListTap'
            },
            'gebarendetail #backButton': {
                tap: 'onBackTap'
            },
            'gebarendetail #nextButton': {
                tap: 'onNextTap'
            },
            'videoView': {
                ended: 'onVideoEnded'
            }
        } // End control
    }, // End config


    onVideoEnded: function(video) {
        video.media.setBottom(-2000); //why is this needed? It seems to stop flickering on reruns?
        video.ghost.show();
        var video = this.getVideoView();
    },


    onNavMenuSelect: function(view, record) {

        var itemIndex = record.get('itemIndex');
        var navlist = Ext.Viewport.down('navlist');

        if(record.data.itemIndex == 1){ // if the list is selected
            var gebarenCatStore = Ext.getStore('gebaarCatStore');
             
            if( !navlist.down('gebarenview') ){
                
                var gebarenview = navlist.add({xtype: 'gebarenview'});
                navlist.setActiveItem(navlist.down('gebarenview'));
                gebarenview.setActiveItem(0);
                var gebarenCatsView = gebarenview.down('dataview[name=catsview]');
                gebarenCatsView.setStore(gebarenCatStore);
                
                //Ext.Viewport.setMasked({xtype:'loadmask', message:'<img src="resources/images/spinner.svg">', cls:'masklist', indicator:false, fullscreen:true});
                //setTimeout(function(){
                //    Ext.Viewport.setMasked(false);
                //},2000);

            } // END if list is active

            if( !navlist.down('gebarendetail') ){
                navlist.add({xtype: 'gebarendetail'});
            } // END if detail page doesn't exist
        } // END if navlist is selected
        else{
            //if( navlist.down('gebarenlijst') ){
            //    navlist.down('gebarenlijst').destroy();
            //} // END if list is not selected, remove it

        } // END else if the list is not selected
        
        
                
        Ext.Viewport.child('tabpanel').setActiveItem(parseInt(itemIndex)); // open the selected page from the menu
        Ext.Viewport.toggleMenu('left'); // Hide the menu. (I would like to have this an immidiate effect (before the new page is completely loaded)     
    }, // END onNavMenuSelect






    onBackListTap: function() {
        var navlist = Ext.Viewport.down('navlist'),
        me=this;
        
        
        if( !navlist.down('gebarenview') ){
            var gebarenCatStore = Ext.getStore('gebaarCatStore');
            var gebarenview = navlist.add({xtype: 'gebarenview'});
            navlist.setActiveItem(navlist.down('gebarenview'));
            gebarenview.setActiveItem(1);
            //var gebarenlijst  = gebarenview.down('gebarenlijst');
            //
            //gebarenlijst.suspendEvents();
            //gebarenlijst.getStore().clearFilter(true);
            //gebarenlijst.getStore().filter('cat',me.currentDetailRecord.data.cat);
            //gebarenlijst.resumeEvents(true);
            //gebarenlijst.refresh();
            // , {type: 'fade', duration: 1000} not sure if this fade is working

// ---- Mask on back tab is not needed for now --------
//            Ext.Viewport.setMasked({xtype:'loadmask', message:'<img src="resources/images/spinner.svg">', cls:'masklist', indicator:false, fullscreen:true, hideAnimation:'fadeOut'});
//            setTimeout(function(){
//                Ext.Viewport.setMasked(false);            
//            },1000);
        }else{
            navlist.setActiveItem(navlist.down('gebarenview'));
            navlist.down('gebarenview').setActiveItem(1);
            //var gebarenlijst  = me.getMain().down('gebarenlijst');
            //gebarenlijst.suspendEvents();
            //gebarenlijst.getStore().clearFilter(true);
            //gebarenlijst.getStore().filter('cat',me.currentDetailRecord.data.cat);
            //gebarenlijst.resumeEvents(true);
            //gebarenlijst.refresh();
        }
        
		Ext.Viewport.hideMenu('left');
        
        
        //this.getMain().setActiveItem(0); // old code before dynamic loading       

// ---------- Experiment 
        

    },
    
   

    onBackTap: function() {
        var me = this,
            store = Ext.getStore('gebaarStore'),
            index = store.indexOf(me.currentDetailRecord);

		
        if (index !== 0) {
            index--;
        }
        else index = store.getCount()-1;

        Ext.Viewport.hideMenu(this.left);
        
        var record = store.getAt(index),
            detail = me.getDetail(),
            video = detail.down('video');

        video.media.hide();
        video.pause();
        //video.setUrl(null);
        me.showDetail(null, null, null, record);
        Ext.Viewport.hideMenu('left');

    
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
        //video.setUrl(null);
        me.showDetail(null, null, null, record);

  	    Ext.Viewport.hideMenu('left');
    },
    
  

    showDetail: function (view, index, target, record) {
        var me = this,
            detail = this.getDetail();
        
        me.getListDetailImage().setSrc("resources/images/objects/" + record.data.plaatje + ".svg");

/* 
// ----------- Android ---------
        if (Ext.os.is.Android) {
//            me.getVideoPlayButton().__url = "file:///android_asset/www/resources/video/" + record.data.plaatje + '.mp4';
            me.getVideoPlayButton().__url = "http://www.new-impulse.com/ASLKids/resources/video/" + record.data.plaatje + '.mp4';
            me.getVideoPlayButton().show();
            me.getListDetailVideo().hide();
//            me.getListDetailButton().__url = "/android_asset/www/resources/audio/" + record.data.plaatje + ".m4a";
            me.getListDetailButton().__url = "http://www.new-impulse.com/ASLKids/resources/audio/" + record.data.plaatje + ".m4a";
//        	me.getListDetailAudio().setUrl("/android_asset/www/resources/audio/" + record.data.plaatje + ".m4a");
        	me.getListDetailAudio().setUrl("http://www.new-impulse.com/ASLKids/resources/audio/" + record.data.plaatje + ".m4a");
        }
// ----------- IOS and browsers ---------        
        else {
            me.getVideoPlayButton().hide();
            me.getListDetailVideo().show();
            me.getListDetailVideo().setUrl("http://www.new-impulse.com/ASLKids/resources/video/" + record.data.plaatje + ".mp4");
            me.getListDetailAudio().setUrl("http://www.new-impulse.com/ASLKids/resources/audio/" + record.data.plaatje + ".m4a");
        }
       */
        
        
      


        me.getMain().animateActiveItem(detail, {type: 'fade', duration: 200});
        



        me.getListDetailButton().setText(record.data.plaatje);

        me.currentDetailRecord = record;

        
         Ext.Viewport.hideMenu('left');

        var gebarenlijst  = me.getMain().down('gebarenlijst'),
            video = me.getListDetailVideo();
        setTimeout(function(){
            video.setUrl("resources/video/" + record.data.plaatje + ".mp4");
            me.getListDetailAudio().setUrl("resources/audio/" + record.data.plaatje + ".m4a");
            video.media.dom.load(); // this is needed!! for ios8,9 and 10
            video.ghost.show();
        },100);
    },
    
    showCatItems:function(view,index,target,record,e,eOpts){
        var me = this,
            gebarenview = me.getGebarenview();
        gebarenview.setActiveItem(1);
        
        var gebarenlijst  = gebarenview.down('gebarenlijst');

        gebarenlijst.suspendEvents();
        gebarenlijst.getStore().clearFilter(true);
        gebarenlijst.getStore().filter('cat',record.data.cat);
        gebarenlijst.getStore().sort("Id","ASC");
        gebarenlijst.resumeEvents(true);
        gebarenlijst.refresh();
        gebarenview.down('[name=catitemtitle]').setTitle(record.data.cat);
        Ext.Viewport.hideMenu('left');
    },
    
    backToCatsView:function(){
        var me = this,
            gebarenview = me.getGebarenview();
        gebarenview.setActiveItem(0);
        Ext.Viewport.hideMenu('left');
    }
});