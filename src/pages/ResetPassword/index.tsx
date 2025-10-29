// import { NewPassword } from "@/components/ResetPassword/NewPassword/indext";
// import { RequestResetPassword } from "@/components/ResetPassword/RequestResetPassword";
import { RecoveryCode } from "@/components/ResetPassword/RecoveryCode";
import { Section } from "@/components/structuralComponents/Section";

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resetPassword/')({
  component: ResetPassword,
});

export function ResetPassword () {
    return (
        <Section>
            <RecoveryCode />
            {/* <NewPassword /> */}
            {/* <RequestResetPassword /> */}
        </Section>
    )
}