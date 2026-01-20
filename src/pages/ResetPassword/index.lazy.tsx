// import { NewPassword } from "@/components/ResetPassword/NewPassword/indext";
// import { RequestResetPassword } from "@/components/ResetPassword/RequestResetPassword";
import { NewPassword } from "@/components/ResetPassword/NewPassword/indext";
// import { RecoveryCode } from "@/components/ResetPassword/RecoveryCode";
// import { RequestResetPassword } from "@/components/ResetPassword/RequestResetPassword";
import { Section } from "@/components/structuralComponents/Section";

import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/resetpassword/')({
  component: ResetPassword,
});

export function ResetPassword () {
    return (
        <Section>
            {/* <RecoveryCode /> */}
            <NewPassword />
            {/* <RequestResetPassword /> */}
        </Section>
    )
}