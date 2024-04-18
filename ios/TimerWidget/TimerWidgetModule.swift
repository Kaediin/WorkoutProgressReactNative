//
//  TimerWidgetModule.swift
//  WorkoutProgress
//
//  Created by Kaedin Schouten on 17/04/2024.
//

import Foundation
import ActivityKit

@objc(TimerWidgetModule)
class TimerWidgetModule: NSObject {
  private var currentActivity: Activity<TimerWidgetAttributes>?
  private var startedAt: Date?
  private var pausedAt: Date?
  private var durationGoal: Int?

  private func areActivitiesEnabled() -> Bool {
    return ActivityAuthorizationInfo().areActivitiesEnabled
  }
  
  private func resetValues() {
    startedAt = nil
    pausedAt = nil
    currentActivity = nil
    durationGoal = nil
  }

  @objc
  func startLiveActivity(_ timestamp: Double, duration: Int) -> Void {
    startedAt = Date(timeIntervalSince1970: timestamp)
    durationGoal = duration
    if (!areActivitiesEnabled()) {
      // User disabled Live Activities for the app, nothing to do
      return
    }
    // Preparing data for the Live Activity
    let activityAttributes = TimerWidgetAttributes()
    let contentState = TimerWidgetAttributes.ContentState(startedAt: startedAt, pausedAt: nil, durationGoal: duration)
    let activityContent = ActivityContent(state: contentState,  staleDate: nil)
    do {
      // Request to start a new Live Activity with the content defined above
      currentActivity = try Activity.request(attributes: activityAttributes, content: activityContent)
    } catch {
      // Handle errors, skipped for simplicity
    }
  }

  @objc
  func stopLiveActivity() -> Void {
    startedAt = nil
    durationGoal = nil
    // A task is a unit of work that can run concurrently in a lightweight thread, managed by the Swift runtime
    // It helps to avoid blocking the main thread
    Task {
      for activity in Activity<TimerWidgetAttributes>.activities {
        await activity.end(nil, dismissalPolicy: .immediate)
      }
    }
  }
  
  @objc
  func pause(_ timestamp: Double, duration: Int) -> Void {
    pausedAt = Date(timeIntervalSince1970: timestamp)
    durationGoal = duration
    let contentState = TimerWidgetAttributes.ContentState(startedAt: startedAt, pausedAt: pausedAt, durationGoal: duration)
    Task {
      await currentActivity?.update(
        ActivityContent<TimerWidgetAttributes.ContentState>(
          state: contentState,
          staleDate: nil
        )
      )
    }
  }
  
  @objc
  func resume(duration: Int) -> Void {
    guard let startDate = self.startedAt else { return }
    guard let pauseDate = self.pausedAt else { return }
    
    let elapsedSincePaused = Date().timeIntervalSince1970 - pauseDate.timeIntervalSince1970
    startedAt = Date(timeIntervalSince1970: startDate.timeIntervalSince1970 + elapsedSincePaused)
    durationGoal = duration
    pausedAt = nil
    
    let contentState = TimerWidgetAttributes.ContentState(startedAt: startedAt, pausedAt: nil, durationGoal: duration)
    Task {
      await currentActivity?.update(
        ActivityContent<TimerWidgetAttributes.ContentState>(
          state: contentState,
          staleDate: nil
        )
      )
    }
  }
}
