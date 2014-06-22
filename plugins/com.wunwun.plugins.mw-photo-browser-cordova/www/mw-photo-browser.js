//
// MWPhotoBrowser.js
//
// Created by Calvin Lai on  2013-08-16.
// Copyright 2013 Calvin Lai. All rights reserved.

var cordova = require('cordova'),
    exec = require('cordova/exec');

var MWPhotoBrowser = function() {
  // constructor
};

// Call this to register for push notifications and retreive a deviceToken
MWPhotoBrowser.prototype.showGallery = function(images, callback) {
  cordova.exec(callback, callback, "MWPhotoBrowserCordova", "showGallery", images ? [images] : []);
};

var mwPhotoBrowser = new MWPhotoBrowser();

module.exports = mwPhotoBrowser;
