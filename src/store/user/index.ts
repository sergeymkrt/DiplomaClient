import { User, Actions } from '@/store/user/types';
import { atom, useRecoilState } from 'recoil';

const userState = atom<User>({
  key: 'user-state',
  default: {} as User,
});
function useUser(): [User, Actions] {
  const [user, setUser] = useRecoilState(userState);

  function set(user: User) {
    setUser(user);
  }
  return [user, { set }];
}

export default useUser;
