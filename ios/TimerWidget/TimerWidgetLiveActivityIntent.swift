//
//  TimerWidgetLiveActivityIntent.swift
//  WorkoutProgress
//
//  Created by Kaedin Schouten on 17/04/2024.
//

import Foundation
import AppIntents

@available(iOS 16.0, *)
public struct PauseIntent: LiveActivityIntent {
  public init() {}
  public static var title: LocalizedStringResource = "Pause timer"
  public func perform() async throws -> some IntentResult {
    TimerEventEmitter.emitter?.sendEvent(withName: "onPause", body: nil)
    return .result()
  }
}

@available(iOS 16.0, *)
public struct ResumeIntent: LiveActivityIntent {
  public init() {}
  public static var title: LocalizedStringResource = "Resume timer"
  public func perform() async throws -> some IntentResult {
    TimerEventEmitter.emitter?.sendEvent(withName: "onResume", body: nil)
    return .result()
  }
}

@available(iOS 16.0, *)
public struct ResetIntent: LiveActivityIntent {
  public init() {}
  public static var title: LocalizedStringResource = "Reset timer"
  public func perform() async throws -> some IntentResult {
    TimerEventEmitter.emitter?.sendEvent(withName: "onReset", body: nil)
    return .result()
  }
}
