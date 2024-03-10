export default interface Pagination {
  pageNumber: number;
  pageSize: number;
  search?: string;
  orderByColumn?: string;
  isAsc?: boolean;
}
