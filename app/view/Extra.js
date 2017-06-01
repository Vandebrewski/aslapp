Ext.define('ASLKids.view.Extra', {
    extend: 'Ext.Container',
    xtype: 'extrapanel',

    config: {
        iconCls: 'info',
        styleHtmlContent: true,
        cls: 'infoscreen',
        scrollable: true,
        items: [
        {
        	xtype: 'spacer',
        	height: 10
        },
        {
        	xtype: 'spacer',
        	height: 10
        },
        {
        	xtype: 'spacer',
        	height: 20
        },
        {
			html: '<h4>ver 1.7 - asl-kids.com</h4>This app comes with 21 free signs, a quiz, the ASL alphabet and an optional pack of 87 extra signs (108 in total) that are easy to learn for young children. The signs are demonstrated by (relatives of) children who are hard of hearing. The app is kid-proof and was designed to be used without the help of an adult. There are no external links or ads so no internet connection is needed. No complex text, but clear and tappable images.<br /><br />Why this app? When our son was identified with a hearing loss, our whole family was eager to learn sign language. We discovered that our kids benefited from interactive visual material. However, it was hard to find suitable apps on signing specifically designed for kids. So we decided to design one ourselves. The aim was to develop an app that is appealing, instructive and most of all FUN! How do children learn best? By imitating other kids! Our son loves it. We hope you will too.<br /><br /><strong>Support</strong><br />We are dedicated to creating and expanding a high-quality app that unlocks your child’s learning potential in a fun way. If you have reinstalled the app, just tap the restore purchases button on top. You can support the app by buying the signs pack (all future sign will be free for you) or give us a good rating in the app store.<br /><br />Tips for improvement or issues? Please mail us info@asl-kids.com or go to asl-kids.com<br /><br />',
            cls:'infotext'
        }]
    }
});
