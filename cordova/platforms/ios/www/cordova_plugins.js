cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cc.fovea.cordova.purchase/www/store-ios.js",
        "id": "cc.fovea.cordova.purchase.InAppPurchase",
        "clobbers": [
            "store"
        ]
    },
    {
        "file": "plugins/com.moust.cordova.videoplayer/www/videoplayer.js",
        "id": "com.moust.cordova.videoplayer.VideoPlayer",
        "clobbers": [
            "VideoPlayer"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cc.fovea.cordova.purchase": "3.10.1",
    "com.moust.cordova.videoplayer": "1.0.1"
}
// BOTTOM OF METADATA
});