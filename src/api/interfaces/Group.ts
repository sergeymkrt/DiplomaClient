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
  Basic,
  Conditential,
  Secret,
  TopSecret,
}
