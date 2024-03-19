// Interface to represent enum case
interface EnumCase {
  name: string;
  value: number;
}

// Function to get enum cases and store them in an array of objects
export function getEnumCases(enumObj: any): EnumCase[] {
  const casesArray: EnumCase[] = [];

  // Iterate over enum keys
  for (const key in enumObj) {
    // Check if the key is a valid enum value
    if (typeof enumObj[key] === 'number') {
      casesArray.push({ name: key, value: enumObj[key] });
    }
  }

  return casesArray;
}
