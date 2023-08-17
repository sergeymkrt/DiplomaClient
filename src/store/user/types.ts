interface User {
  name: string;
  surName: string;
  userName: string;
  phoneNumber: string;
  email: string;
}

type Actions = {
  set: (user: User) => void;
};

export type { User, Actions };
