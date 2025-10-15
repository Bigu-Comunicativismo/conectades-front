import { UserProvider } from "@/contexts/userContext";
import { SignUp } from "@/components/SignUp";

export function SignUpPage() {
    return (
        <UserProvider>
            <SignUp />
        </UserProvider>
    )
}