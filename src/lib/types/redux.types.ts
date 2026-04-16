import type { IAnimal } from '@/src/@types/animal';
import type { IUser } from '@/src/@types/user';

export interface RootState {
  home: {
    nav: string;
  };
  animal: {
    animalList: IAnimal[];
    animalSoftDeletedList: IAnimal[];
    animal: IAnimal;
    inputSearch: string;
    inputFilter: string;
    isloading: boolean;
    error: string | null;
    deleted: boolean;
    isAdded: boolean;
    isEdited: boolean;
  };
  auth: {
    credentials: {
      email: string;
      password: string;
    };
    connectedUser: {
      avatar: string;
      userId: number;
      lastname: string;
      firstname: string;
      role?: 'Bénévole' | 'Employé' | 'Admin';
    };
    token?: string;
    remember: boolean;
    isloading: boolean;
    message: string;
    modified: boolean;
  };
  user: {
    users: IUser[];
    deletedUsers: IUser[];
    user: IUser;
    confirmPassword: string;
    isloading: boolean;
    error: string | null;
    remove: boolean;
  };
}
