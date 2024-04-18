//
//  TimerWidgetBridge.m
//  WorkoutProgress
//
//  Created by Kaedin Schouten on 17/04/2024.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TimerWidgetModule, NSObject)

+ (bool)requiresMainQueueSetup {
  return NO;
}

RCT_EXTERN_METHOD(startLiveActivity:(nonnull double *)timestamp duration:(nonnull int *)duration)
RCT_EXTERN_METHOD(pause:(nonnull double *)timestamp duration:(nonnull int *)duration)
RCT_EXTERN_METHOD(resume)
RCT_EXTERN_METHOD(stopLiveActivity)

@end
