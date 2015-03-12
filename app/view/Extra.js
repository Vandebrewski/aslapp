Ext.define('ASLKids.view.Extra', {
    extend: 'Ext.Container',
    xtype: 'extrapanel',

    config: {
        iconCls: 'info',
        styleHtmlContent: true,
        cls: 'infoscreen',
        scrollable: true,
//        height: 975,
        items: [{
            html: '<p style="margin: 20px 10px 10px 0 !important;"><img src="resources/images/home-logo-kleiner.svg" height="200">Restore of previous purchases<br /><h3>Learn American Sign Language (ASL) in a fun way</h3>This app contains over 50 signs (more to come) that are easy to learn for young children. The signs are demonstrated by (relatives of) children who are hard of hearing. The app is kid-proof and was designed to be used without the help of an adult. There are no external links or ads so no internet connection is needed. No complex text, but clear and tappable images.  <br /><br />Why this app? When my son was identified with hearing loss, our whole family was eager to learn sign language. We discovered that our kids benefited from interactive visual material. However, it was hard to find suitable apps on signing specifically designed for kids. So I decided to design one myself. I developed an app that is appealing, instructive and most of all FUN! How do children learn best? By watching other kids! My son loves it. I hope you will too.<br /><br /><strong>Support</strong><br />We are dedicated to creating and expanding a quality app that unlocks your child’s learning potential in a fun way.<br /><br />Tips for improvement? Go to asl-kids.com and let us know.</p>'
        }]
    }
})

