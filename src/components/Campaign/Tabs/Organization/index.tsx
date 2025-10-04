import { Profile } from "./Profile";
import type { User } from "./Profile";

interface OrganizationProps {
    organizator: User[]
}

export function Organization({organizator}:OrganizationProps) {
    return (
        <>
        {organizator.map((user:User) => <Profile user={user} key={user.name}/>)}
        </>
    )
}