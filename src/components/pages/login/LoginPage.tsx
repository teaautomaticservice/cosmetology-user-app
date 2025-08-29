import { AuthLayout } from "@components/domain/authorization/layout/AuthLayout"
import { Login } from "@components/domain/authorization/login/Login"

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  )
}