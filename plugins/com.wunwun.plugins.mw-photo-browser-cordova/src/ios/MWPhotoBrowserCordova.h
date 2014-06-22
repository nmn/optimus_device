//
//  ImageViewer.h
//  Helper
//
//  Created by Calvin Lai on 7/11/13.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "MWPhotoBrowser.h"

@interface MWPhotoBrowserCordova : CDVPlugin <MWPhotoBrowserDelegate> {

    NSMutableDictionary* callbackIds;
    NSArray* photos;

}

@property (nonatomic, retain) NSMutableDictionary* callbackIds;
@property (nonatomic, retain) NSArray *photos;

- (void)showGallery:(CDVInvokedUrlCommand*)command;

@end
