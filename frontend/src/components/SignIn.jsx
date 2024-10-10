import { useUser } from "@clerk/clerk-react";

function SigninPage() {
  const { user } = useUser();

  return <div>{user.firstName} hi you are logged in</div>;
}

export default SigninPage;
