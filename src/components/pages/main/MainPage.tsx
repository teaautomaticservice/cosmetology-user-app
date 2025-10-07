import { useEffect } from 'react';
import { MySpace } from '@components/domain/mySpace/MySpace';
import { useMySpacePageStore } from '@stores/pages/mySpacePage';

export const MainPage: React.FC = () => {
  const { updateData } = useMySpacePageStore();

  useEffect(() => {
    updateData();
  }, []);

  return (
    <MySpace />
  );
};
