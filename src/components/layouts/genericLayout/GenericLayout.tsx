import { RootModal } from '@components/domain/rootModal/RootModal';

import s from './genericLayout.module.css';

type Props = React.PropsWithChildren;

export const GenericLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={s.root}>
      <div className={s.mainWrapper}>
        {children}
      </div>

      <RootModal />
    </div>
  )
}