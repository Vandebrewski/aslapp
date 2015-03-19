Ext.define('ASLKids.overrides.Video', {
	override : 'Ext.Video',
	
	
	    onErased: function() {
        this.pause();
        this.media.setBottom(-2000);
        this.ghost.show();
        console.log('my override is working onErased');
    	},
    
        onPlay: function() {
//        this.callParent(arguments); // can this be optimized to this.callParent([ parentNode, index ]); http://www.sencha.com/blog/top-support-tips-august-2014/
        this.media.setBottom(0);
        console.log('my override is working onPlay', arguments); // I can see this message on play so this works        
    	},
    
    	onPlay: function() {
        this.fireEvent('play', this);
    },
   
// onGhostTap: I think their should be a delay in showing the video (/removing the poster outside the screen) to avoid the black flash.
   
   
    
    // I would like te remove the function underneath in video.js how can I do this  

//    onPause: function() {
//        this.callParent(arguments);
//        if (!this.isInlineVideo) {
//            this.media.setBottom(-2000);
//            this.ghost.show();
//        }
//    },
 
   
});