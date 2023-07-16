const Constants = {
  PRIMARY_GRADIENT: ['#006666', '#00C5ED'],
  SECONDARY_GRADIENT: ['#41E1B4', '#9DE297'],
  TERTIARY_GRADIENT: ['#00b7fc', '#57b1ff'],
  ERROR_GRADIENT: ['#F20D0D', '#f20d0dbf'],
  POSITIVE_GRADIENT: ['#006666', '#003300'],

  BORDER_RADIUS_SMALL: 5,
  BORDER_RADIUS_LARGE: 20,

  BOTTOM_SHEET_SNAPPOINTS: Array.from(
    new Array(101),
    (val, index) => `${index + 1}%`,
  ),
  WEIGHT_POINTS: Array.from(new Array(400), (val, index) => `${index + 1}`),
  WEIGHT_FRACTION_POINTS: [0, 0.25, 0.5, 0.75],
  CONTAINER_PADDING: 10,

  TEXT_INPUT_MAX_LENGTH: 46,
};

export default Constants;
