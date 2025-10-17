// import { NewPassword } from "@/components/ResetPassword/NewPassword/indext";
// import { RequestResetPassword } from "@/components/ResetPassword/RequestResetPassword";
import { RecoveryCode } from "@/components/ResetPassword/RecoveryCode";
import { Section } from "@/components/structuralComponents/Section";


export function ResetPassword () {
    return (
        <Section>
            <RecoveryCode />
            {/* <NewPassword /> */}
            {/* <RequestResetPassword /> */}
        </Section>
    )
}