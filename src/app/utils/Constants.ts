const Constants = {
  PRIMARY_GRADIENT: ['#006666', '#00C5ED'],
  SECONDARY_GRADIENT: ['#124a49', '#114c54'],
  SECONDARY_GRADIENT_FADED: ['rgba(39,154,121,0.5)', 'rgba(79,119,75,0.5)'],
  TERTIARY_GRADIENT: ['#32ccc8', '#29afbe'],
  QUATERNARY_GRADIENT: ['#218683', '#1d828d'],
  ERROR_GRADIENT: ['#F20D0D', '#f20d0dbf'],
  TIMER_GRADIENT: ['#00ffe1'],

  BORDER_RADIUS_SMALL: 5,
  BORDER_RADIUS_LARGE: 20,

  BOTTOM_SHEET_SNAPPOINTS: Array.from(
    new Array(101),
    (val, index) => `${index + 1}%`,
  ),
  WEIGHT_POINTS: Array.from(new Array(401), (val, index) => `${index}`),
  DURATION_SECONDS: Array.from(
    new Array(380),
    (val, index) => +`${10 + index}`,
  ),
  WEIGHT_FRACTION_POINTS: [0, 0.25, 0.5, 0.75],
  CONTAINER_PADDING_MARGIN: 10,

  TEXT_INPUT_MAX_LENGTH: 46,
  TEXT_AREA_MAX_LENGTH: 100,

  DEFAULT_REPETITIONS: 10,
  DEFAULT_DURATION: 120, // 2 minutes

  FAB_ACTION_COLOR: '#218683',
};

export default Constants;
