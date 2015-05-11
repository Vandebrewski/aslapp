Ext.define('ASLKids.overrides.Video', {
	override : 'Ext.Video',
	
	requires: ['Ext.fx.Animation'],
	
	    template: [{
        reference: 'ghost',
        classList: [Ext.baseCSSPrefix + 'video-ghost']
    }, {
        tag: 'video',
        reference: 'media',
        classList: [Ext.baseCSSPrefix + 'media'],
        'webkit-playsinline': 'true' // makes in play inline on iPhone
    }],

	
	//setBottom is needed to position the video correctly
    onErased: function() {
        this.pause();
        this.media.setTop(null);
        this.media.setBottom(-2000);
        this.ghost.show();
	},
    
    onPlay: function() {
        this.callParent(arguments); // can this be optimized to this.callParent([ parentNode, index ]); http://www.sencha.com/blog/top-support-tips-august-2014/
	    this.media.setTop(null);
        this.media.setBottom(0);
	},
	
	onPause: function() {
        this.fireEvent('pause', this, this.getCurrentTime());
        this.media.dom.currentTime = 0;

        if (!Ext.os.is.iPhone || !this.isInlineVideo) {
            this.media.setBottom(-2000);
            this.ghost.show();
        }
   },
   
   updateUrl: function() {
        var me = this;
        
        me.callParent(arguments);
        
	if (Ext.os.version.getMajor() > 7) { // ios8 hack for loading videos in listdetail
        setTimeout(function() {
            me.media.dom.load();
        }, 100);
	}

    },
	
    	
// set a delay in hiding the poster image
	onGhostTap: function() {
        var me = this,
            media = this.media,
            ghost = this.ghost;

        
        if (Ext.browser.is.AndroidStock2) {
            media.show();

            setTimeout(function() {
                me.play();
                setTimeout(function() {
                    media.hide();
                }, 10);
            }, 10);
        } else {
            me.play();

            setTimeout(function() {
                ghost.hide();
                media.show();
            }, 200); // change this number if you want less/more of a delay
        }
    }
});