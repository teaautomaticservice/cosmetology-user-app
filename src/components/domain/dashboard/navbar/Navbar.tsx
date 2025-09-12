import { AddMessageForm } from "@components/domain/historyMessages/addMessageForm/AddMessageForm";

import s from './navbar.module.css';

export const Navbar: React.FC = () => {
  return (
    <div className={s.root}>
      <AddMessageForm />
    </div>
  )
}