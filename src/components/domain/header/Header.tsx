import { useAppConfigStore } from "@stores/appConfig"
import { Button } from "antd"

export const Header: React.FC = () => {
  const { logOut } = useAppConfigStore();

  return (
    <div>
      Header
      <Button type="primary" onClick={logOut}>LogOut</Button>
    </div>
  )
}