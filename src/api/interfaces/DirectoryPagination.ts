import Pagination from '@/api/interfaces/Pagination';

export default interface DirectoryPagination extends Pagination {
  parentDirectoryId?: number;
}
