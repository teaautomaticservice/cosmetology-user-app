import { useEffect } from "react";
import { useAppConfigStore } from "@stores/appConfig";
import { useSearchParams } from "react-router-dom"

export const CompleteRegistrationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userToken = searchParams.get("userToken");
  const { loginByUserToken, currentUser } = useAppConfigStore();

  useEffect(() => {
    if (userToken) {
      loginByUserToken(userToken)
    }
  }, []);

  return (
    <div>
      <div>Hello new user!</div>
      {currentUser && (
        <div>
          Name: {currentUser.displayName}
          Email: {currentUser.email}
        </div>
      )}
    </div>
  )
}