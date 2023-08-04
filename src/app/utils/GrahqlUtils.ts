export const stripTypenames = (value: any): any => {
  if (Array.isArray(value)) {
    return value.map(stripTypenames);
  } else if (value !== null && typeof value === 'object') {
    const newObject = {};
    for (const property in value) {
      if (property !== '__typename') {
        // @ts-ignore
        newObject[property] = stripTypenames(value[property]);
      }
    }
    return newObject;
  } else {
    return value;
  }
};
