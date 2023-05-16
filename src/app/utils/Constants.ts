const Constants = {
  PRIMARY_GRADIENT: ['#006666', '#00C5ED'],
  SECONDARY_GRADIENT: ['#7ceece', '#d7f7d4'],
  ERROR_GRADIENT: ['#F20D0D', '#f20d0dbf'],
  POSITIVE_GRADIENT: ['#006666', '#003300'],
  BORDER_RADIUS_SMALL: 5,
  BORDER_RADIUS_LARGE: 20,
  BOTTOM_SHEET_SNAPPOINTS: Array.from(
    new Array(100),
    (val, index) => `${index + 1}%`,
  ),
};

export default Constants;
