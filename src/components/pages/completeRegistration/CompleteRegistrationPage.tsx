import { useEffect } from "react";
import { CompleteRegistration } from "@components/domain/completeRegistration/CompleteRegistration";
import {
  RegistrationFallback
} from "@components/domain/completeRegistration/registrationFallback/RegistrationFallback";
import { useAppConfigStore } from "@stores/appConfig";
import { UserStatusEnum } from "@typings/api/users";
import { useSearchParams } from "react-router-dom"

export const CompleteRegistrationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userToken = searchParams.get("userToken");
  const { loginByUserToken, currentUser } = useAppConfigStore();

  useEffect(() => {
    if (userToken) {
      loginByUserToken(userToken);
    }
  }, []);

  if (
    (!currentUser && !userToken) ||
    (currentUser && currentUser.status !== UserStatusEnum.PENDING)
  ) {
    return <RegistrationFallback />;
  }

  return (
    <CompleteRegistration />
  )
}