import { CreateGroupDto, Group } from '@/api/interfaces/Group';
import { get, post } from '@/utils/httpClient';
import Paginated from '@/api/interfaces/Paginated';
import Pagination from '@/api/interfaces/Pagination';
import QueryStringBuilder from '@/utils/QueryStringBuilder';

export async function GetGroups(pagination: Pagination) {
  const queryParams = QueryStringBuilder(pagination);
  return get<Paginated<Group>>('/Group' + queryParams);
}

export async function CreateGroup(group: CreateGroupDto) {
  return post<void>(`/Group`, group);
}
