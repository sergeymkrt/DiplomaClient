export default function QueryStringBuilder(obj: object) {
  const paginationKeyValues = Object.entries(obj).map(([key, value]) => {
    if (value === undefined || value === null) {
      return `${key}=`;
    }
    return `${key}=${value}`;
  });
  return '?' + paginationKeyValues.join('&');
}
