import { UserProvider } from "@/contexts/userContext";
import { SignUp } from "@/components/SignUp";

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signup/')({
  component: SignUpPage,
});

export function SignUpPage() {
    return (
        <UserProvider>
            <SignUp />
        </UserProvider>
    )
}