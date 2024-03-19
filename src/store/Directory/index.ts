import { atom, useRecoilState } from 'recoil';

const directoryState = atom<number | undefined>({
  key: 'directory-state',
  default: undefined,
});

function useCurrentDirectory(): [
  number | undefined,
  { setDirectory: (id: number | undefined) => void },
] {
  const [currentDirectoryId, setCurrentDirectoryId] = useRecoilState(directoryState);

  function setDirectory(id: number | undefined) {
    setCurrentDirectoryId(id);
  }

  return [currentDirectoryId, { setDirectory }];
}

export default useCurrentDirectory;
