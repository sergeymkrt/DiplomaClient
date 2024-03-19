export interface Group {
  id: number;
  name: string;
  description: string;
  accessLevelId: AccessLevel;
  users: ShortUser[];
}

export interface CreateGroupDto {
  name: string;
  description: string;
  accessLevelId: AccessLevel;
}

export interface ShortUser {
  id: number;
  email: string;
}

export enum AccessLevel {
  Basic = 1,
  Confidential = 2,
  Secret = 3,
  TopSecret = 4,
}
