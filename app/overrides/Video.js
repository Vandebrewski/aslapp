Ext.define('ASLKids.overrides.Video', {
	override : 'Ext.Video',
	
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
    	
// trying to set a delay in hiding the poster image
    	onGhostTap: function() {
        var me = this,
            media = this.media,
            ghost = this.ghost;

        media.show(null);
        if (!Ext.browser.is.AndroidStock2) {
            setTimeout(function() {
                me.play();
                setTimeout(function() {
                    media.hide(null);
                    ghost.hide();
                    media.show();                    
                }, 1500);
            }, 1500);
        } else {
            // Browsers which support native video tag display only, move the media down so
            // we can control the Viewport
            ghost.hide();
            me.play();
        }
    }
       
    
   
       
    
 
   
});