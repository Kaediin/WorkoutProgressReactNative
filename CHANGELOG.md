## [v0.1.5]

### Added

- #60: Add forgot password logic
- #62: Increase hitslop on bottomsheet buttons
- #64: Add repeat log to action button

### Changed

- #63: Timer stops when end workout is pressed
- #63: Timer doesn't overlay the bottom sheet

### Fixed

- #59: Timer doesn't overlap FAB actions anymore
- #59: Now able to edit logged workout that is marked as a warmup log
- #59: Popup doesn't auto close after selection muscles
- #59: When the timer goes off, music isn't paused

## [v0.1.4]

### Added

- #56: Media plays when on timer complete

### Changed

- #54: Preset the last logged exercise when tapping on new log
- #54: No Create exercise button
- #54: Sort exercises alphabetically
- #54: Add 'end workout' to context menu in overview if the workout is still active
- #54: Reword 'dismiss' to cancel
- #54: Make placeholder text more visible
- #56: Timer now runs on all activities
- #56: Stronger haptic feedback on timer complete
- #57: Increased performance in weight select

### Fixed:

- #55: Bugs after release 0.1.3
- #58: Access denied after fresh login

## [v0.1.3]

### Added

- #14: FAB library to allow for a selection of options after interacting
- #14: Added timer function
- #14: Added preference to set a default timer duration
- #14: Added preference to set auto start the timer after logging

### Changed

- #49: Made the weight selector for the log exercise field expandable

### Fixed

- #51: Make fields a single line with heigh instead of multiline. this way the return key on the keyboard will close the
  board instead of add an extera line.
- #51: Loader not centered in log exercise bottom sheet
- #51: No loader when refetching workouts after starting one
- #51: Value and fraction doesnt get preset
- #51: Tapping on a grouped log is now an edit function
- #51: Default duration of the timer is now correct

## [v0.1.2]

### Added

- #32: Readme & license
- #39: Mini floating button to re-log the latest logged exercise for a workout
- #48: A light background indicating the select field. This should help prevent accidentally changing the logged weight
  when the intention was to scroll.
- #48: Removed the big button in modals and replaces with simple, responsive, header text pressables

### Fixed

- #40: Setting a default applied weight to existing exercise
- #41: Cant scroll on exercises in profile
- #42: Can't input fractions
- #47: Nothing happens when inputting wrong credentials on login

## [v0.1.1]

### Added

- #30: Edit workout functionality
- #35: Alignment to create exercise
- #35: Background colors
- #35: Retry button to connect to the API
- #35: Support for when a device is offline
- #35: Workout duration
- #35: Keyboard avoiding view
- #35: Add shadow over floating button
- #35: Make exercises click to expand
- #35: Adjusted splash screen
- #35: Are you sure popup when removing exercise and log
- #37: Support for logging distance

### Fixed

- #33: No refresh on the overview page after starting a workout
- #33: No workout update after adding an exercise updating the muscle groups
- #33: Can't edit log
- #33: Weight picker doesn't reset when logging a new exercise after being preset
- #33: Decrease size unit selector in preference
- #33: Login screen shows when starting the app

### Changed

- #34: Changed exercise selector in log to picker
- #34: Exercise selector now correctly updates when creating new exercise
- #36: Last logged exercise is not last logged set

## [v0.1.0]

### Added

- #16: Warmup toggle
- #17: Preference option for hiding unit selector
- #18: Remarks for creating a workout and logging an exercise
- #20: Option to add a default applied weight to an exercises. Useful for some logging certain machines
- #22: Clicking on a grouped exercise log now opens the log sheet with the pressed log preset
- #23: Notes to exercise
- #27: Adjusted opacity
- #27: Removed main time from grouped log
- #27: Expanded height on exercises
- #27: Added multiple columns on larger phones
- #27: Centered loader
- #28: Auto adjust workout muscle groups based on logged exercises
- #29: Footnote indicating last logged exercise log if doing an exercise for the first time in the workout

### Fixed

- #19: Refresh selector when creating a new exercise when logging
- #19: Restyled the 'Create new exercise' on log screen
- #19: Data refreshes when added or editing an exercise in the profile screen
- #19: Styled the preferences the same
- #24: User going to MFA screen with invalid credentials

### Changed

- #21: Migration number value of logged weight to WeightValue object

## [v0.0.4]

### Added

- #8: Preferences to the profile screen
- #9: Added responsiveness to signup page
- #9: Prevented first letter being capital for middle name
- #11: Delete option to Workouts
- #11: Delete option to Exercises
- #11: Edit option to Exercises

### Fixed

- #12: Logged exercises in workouts now logs the zoned date time on log
- #13: Scroll on log workout exercises
- #15: Fixed end workout button not working

## [v0.0.3]

### Added

- #5: When logging an exercise previously done, it prefills the pickers with the latest logged
- #5: Relative dates if it's today, otherwise shown with date
- #7: Max Lengths to textual input fields

### Changed

- #5: Prevented being able to edit exercise id when editing
- #6: moved Cognito credentials to environment files

## [v0.0.2]

### Added

- #3: Password entry in login
- #3: Adjusted Secondary colors
- #3: Corrected form validation
- #3: Loader in profile
- #3: Navbar icons
- #3: SVG support