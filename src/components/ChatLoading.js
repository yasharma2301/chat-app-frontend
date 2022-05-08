import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
    const skeletonCount = 15;
    const skeletonArray = Array(skeletonCount).fill().map((_, idx) => `Skeleton-${idx}`);

    return (
        <Stack>
            {
                skeletonArray.map(skeleton => <Skeleton key={skeleton} height="45px" />)
            }
        </Stack>
    );
};

export default ChatLoading;