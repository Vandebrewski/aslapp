Ext.define('ASLKids.view.Extra', {
    extend: 'Ext.Container',
    xtype: 'extrapanel',

    config: {
//        title: '', // there doesn't need to be a title
        iconCls: 'info',
        styleHtmlContent: true,
        cls: 'tekstscreen',
        scrollable: false,
        height: 1024,
        items: [{
//            xtype: 'container',
            html: '<p style="margin: 0 auto !important;"><img src="resources/images/home-logo-kleiner.png"><h3>Learn American Sign Language (ASL) in a fun way</h3>This app contains 50 signs that are easy to learn for children at the age of 0-5. <br />The signs are taught by children who have a (relative with a) hearing impairment.<br /><br />Why this app? When my 2 year old son was about to get a cochlear implant (CI)<br /> because of his hearing loss, he had to learn how to hear ’again’. He loves to play<br /> with the iPad so I (as a web / app developer) wanted to develop an app that could<br /> teach him signs and speech on his own in a fun way. Instead of using adult roll<br /> models, I thought it would be extra fun to let his sister and nieces do the signing.<br /> He loves it. Hopefully you love it to. Tips for improvement? Go to asl-kids.com</p>'
        }]
    }
})

