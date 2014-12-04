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
            xtype: 'container',
            html: '<center><br /><img src="resources/images/extra-image.png"><br /><br /><h3>ASL Kids</h3></center><br /><p style="margin: 10px 20px 10px 20px;">Learn sign language in a fun way<br /><br />This app contains 50 signs that are easy to learn for children at the age of 0-5. <br />The signs are taught by children who have a (relative with) hearing impairment. Ieder item bevat een foto van een dier met daaronder een filmpje van het bijbehorende gebaar. Als je tikt op de grote <i>play</i> knop of het kleinere knopje naast de naam van het dier, dan speelt/stopt het filmpje of geluidsfragment. Door de interactie tussen het kind en de app en de combinatie van geluid, afbeelding en gebaar kunnen kinderen gemakkelijker nieuwe informatie onthouden.<br /><br />Deze app is ontwikkeld voor en door kinderen/familie van slechthorende kinderen naar een idee van New-impulse media in samenwerking met de NSDSK. De gebarenvideos zijn ontwikkeld door Berengroep.<br /><br /><center><img src="resources/images/nsdsk-klein.png"></center></p>'
        }]
    }
})

