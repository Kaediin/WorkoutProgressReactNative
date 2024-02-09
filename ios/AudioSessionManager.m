//
//  AudioSessionManager.m
//  WorkoutProgress
//
//  Created by Kaedin Schouten on 08/02/2024.
//
#import "AudioSessionManager.h"
#import <AVFoundation/AVFoundation.h>

@implementation AudioSessionManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(activateAudioSession) {
    NSError *error = nil;
    [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback
                                     withOptions:AVAudioSessionCategoryOptionDuckOthers
                                           error:&error];
    if (!error) {
        [[AVAudioSession sharedInstance] setActive:YES error:&error];
    }
    if (error) {
        NSLog(@"Error activating audio session: %@", error);
    }
}

RCT_EXPORT_METHOD(deactivateAudioSession) {
    NSError *error = nil;
    [[AVAudioSession sharedInstance] setActive:NO withOptions:AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation error:&error];
    if (error) {
        NSLog(@"Error deactivating audio session: %@", error);
    }
}

@end

