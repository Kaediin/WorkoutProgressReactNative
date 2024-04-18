//
//  TimerWidgetLiveActivity.swift
//  TimerWidget
//
//  Created by Kaedin Schouten on 17/04/2024.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct TimerWidgetAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    // Dynamic stateful properties about your activity go here!
    // Unix timestamp in seconds
    var startedAt: Date?
    var pausedAt: Date?
    var durationGoal: Int?
    
    func getElapsedTimeInSeconds() -> Int {
      let now = Date()
      guard let startedAt = self.startedAt else {
        return 0
      }
      guard let pausedAt = self.pausedAt else {
        return Int(now.timeIntervalSince1970 - startedAt.timeIntervalSince1970)
      }
      return Int(pausedAt.timeIntervalSince1970 - startedAt.timeIntervalSince1970)
    }
    
    func getPausedTime() -> String {
      let elapsedTimeInSeconds = (durationGoal ?? 0) - getElapsedTimeInSeconds()
      let minutes = (elapsedTimeInSeconds % 3600) / 60
      let seconds = elapsedTimeInSeconds % 60
      return String(format: "%d:%02d", minutes, seconds)
    }
    
    func getTimeIntervalSinceNow() -> Double {
      guard let startedAt = self.startedAt else {
        return 0
      }
      if (Double(durationGoal ?? 0) == 0) {
        return startedAt.timeIntervalSince1970 - Date().timeIntervalSince1970
      }
      return Double(durationGoal ?? 0) - (startedAt.timeIntervalSince1970 - Date().timeIntervalSince1970)
    }
    
    func isRunning() -> Bool {
      return pausedAt == nil
    }
  }
}

struct TimerWidgetLiveActivity: Widget {
  func rgb(_ red: Double, _ green: Double, _ blue: Double) -> Color {
    return Color(red: red/255.0, green: green/255.0, blue: blue/255.0)
  }
  
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: TimerWidgetAttributes.self) { context in
      // Lock screen/banner UI goes here
      ZStack {
        LinearGradient(gradient: Gradient(colors: [Color(red: 50/255.0, green: 204/255.0, blue: 200/255.0), Color(red: 41/255.0, green: 175/255.0, blue: 190/255.0)]), startPoint: .trailing, endPoint: .leading)
          .edgesIgnoringSafeArea(.all)
        HStack {
          Image("Logo")
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(width: 50, height: 50) // Adjust size as needed
            .padding()
          
          if (!context.state.isRunning()) {
            Text(
              context.state.getPausedTime()
            )
            .font(.title)
            .fontWeight(.medium)
            .multilineTextAlignment(.trailing)
            .foregroundColor(.white) // Assuming your text color should be white on the blue gradient
            .padding()
            .frame(maxWidth: .infinity, alignment: .trailing)
          } else {
            Text(
              Date(timeIntervalSinceNow: context.state.getTimeIntervalSinceNow()),
              style: .timer
            )
            .font(.title)
            .fontWeight(.medium)
            .multilineTextAlignment(.trailing)
            .foregroundColor(.white) // Assuming your text color should be white on the blue gradient
            .padding()
            .frame(maxWidth: .infinity, alignment: .trailing)
          }
        }
      }
    } dynamicIsland: { context in
      DynamicIsland {
        // Expanded Region
        DynamicIslandExpandedRegion(.center) {
            HStack {
              HStack(spacing: 8.0, content: {
                Button(intent: ResetIntent()) {
                  ZStack {
                    Circle().fill(.gray.opacity(0.5))
                    Image(systemName: "xmark")
                      .imageScale(.medium)
                      .foregroundColor(.white)
                  }
                }
                .buttonStyle(PlainButtonStyle()) // Removes default button styling
                .contentShape(Rectangle()) // Ensures the tap area includes the entire custom content
                Spacer()
              })
              if (!context.state.isRunning()) {
                Text(
                  context.state.getPausedTime()
                )
                .font(.title)
                .foregroundColor(.cyan)
                .fontWeight(.medium)
                .monospacedDigit()
                .transition(.identity)
              } else {
                Text(
                  Date(
                    timeIntervalSinceNow: context.state.getTimeIntervalSinceNow()
                  ),
                  style: .timer
                )
                .font(.title)
                .foregroundColor(.cyan)
                .fontWeight(.medium)
                .monospacedDigit()
                .frame(width: 60)
                .transition(.identity)
              }
            }
        }
      } compactLeading: {
        Image(systemName: "timer")
          .imageScale(.medium)
          .foregroundColor(.cyan)
      } compactTrailing: {
        if (context.state.pausedAt != nil) {
          Text(context.state.getPausedTime())
            .foregroundColor(.cyan)
            .monospacedDigit()
        } else {
          Text(
            Date(
              timeIntervalSinceNow: context.state.getTimeIntervalSinceNow()
            ),
            style: .timer
          )
          .foregroundColor(.cyan)
          .monospacedDigit()
          .frame(maxWidth: 32)
        }
      } minimal: {
        Text(
          Date(
            timeIntervalSinceNow: context.state.getTimeIntervalSinceNow()
          ),
          style: .timer
        )
        .foregroundColor(.cyan)
        .monospacedDigit()
        .font(.system(size: 14))
        
        //        Image(systemName: "timer")
        //          .imageScale(.medium)
        //          .foregroundColor(.cyan)
      }
      .widgetURL(URL(string: "http://www.apple.com"))
      .keylineTint(.white)
    }
  }
}

extension TimerWidgetAttributes {
  fileprivate static var preview: TimerWidgetAttributes {
    TimerWidgetAttributes()
  }
}

extension TimerWidgetAttributes.ContentState {
  fileprivate static var initState: TimerWidgetAttributes.ContentState {
    TimerWidgetAttributes.ContentState(startedAt: Date(), durationGoal: 100)
  }
}

#Preview("Notification", as: .content, using: TimerWidgetAttributes.preview) {
  TimerWidgetLiveActivity()
} contentStates: {
  TimerWidgetAttributes.ContentState.initState
}
