export default interface Paginated<T> {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  items: T[];
  hasPrevious: boolean;
  hasNext: boolean;
}
