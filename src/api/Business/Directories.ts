import DirectoryPagination from '@/api/interfaces/DirectoryPagination';
import { get } from '@/utils/httpClient';
import QueryStringBuilder from '@/utils/QueryStringBuilder';
import DirectoryDto from '@/api/Dtos/DirectoryDto';
import Paginated from '@/api/interfaces/Paginated';

export async function GetDirectories(pagination: DirectoryPagination) {
  const queryString = QueryStringBuilder(pagination);
  return get<Paginated<DirectoryDto>>('/Directory' + queryString);
}
