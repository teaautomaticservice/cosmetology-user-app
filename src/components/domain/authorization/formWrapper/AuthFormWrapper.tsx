import cn from 'classnames';

import s from './authFormWrapper.module.css';

type Props = React.PropsWithChildren<{
  className?: string;
}>;

export const AuthFormWrapper: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn(s.root, className)}>{children}</div>
  )
}