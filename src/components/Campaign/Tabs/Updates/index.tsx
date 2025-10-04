import { UpdatePost, type updatePost } from "./UpdatePost";

export function Updates({ updates }: { updates: updatePost[] }) {
    return (
        <>
            {updates.map((update) => (
                <UpdatePost update={update} key={update.id} />
            ))}
        </>
    );
}