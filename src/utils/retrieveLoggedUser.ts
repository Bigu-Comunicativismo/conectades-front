import type { LoggedUser } from "@/contexts/loggedUserContext";



export function retrieveLoggedUser(setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUser | undefined>>) {
    const storedUser = localStorage.getItem("user");
    const storedTokens = localStorage.getItem("tokens");
    let user, tokens;
    if (storedUser) return  user = JSON.parse(storedUser);
    if (storedTokens) return  tokens = JSON.parse(storedTokens);
    if (user && tokens) return setLoggedUser({user, tokens});
    return user;
}