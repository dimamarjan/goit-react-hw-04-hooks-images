import { LoadMoreButton } from "./Loader.style";

export function Loader({onLoadData}) {
    return (
        <LoadMoreButton onClick={onLoadData}>Load more</LoadMoreButton>
    );
}
