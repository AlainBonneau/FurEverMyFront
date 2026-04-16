export type ConnectedUser = {
  avatar: string;
  userId: number;
  lastname: string;
  firstname: string;
  role?: 'Bénévole' | 'Employé' | 'Admin';
};
