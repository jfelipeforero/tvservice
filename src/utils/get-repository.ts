import { UsersRoles } from 'src/auth/users-role.enum';

export enum UsersRepos {
  client = 'clientsRepo',
  technician = 'techniciansRepo',
}

export function getRepo(role: UsersRoles): UsersRepos {
  return UsersRepos[role];
}
