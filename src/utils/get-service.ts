enum UsersServices {
  client = 'clientsService',
  technician = 'techniciansService',
}

export const getService = (role: string): keyof UsersServices => {
  return UsersServices[role];
};
