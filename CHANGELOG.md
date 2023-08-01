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