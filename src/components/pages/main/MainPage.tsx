import { useEffect } from 'react';
import { MySpace } from '@components/domain/mySpace/MySpace';
import { useMySpaceStore } from '@stores/mySpace';

export const MainPage: React.FC = () => {
  const { updateData } = useMySpaceStore();

  useEffect(() => {
    updateData();
  }, []);

  return (
    <MySpace />
  );
};
