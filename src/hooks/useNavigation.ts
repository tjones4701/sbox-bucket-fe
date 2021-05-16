import { useRouter } from "./useRouter";

export function useNavigation() {
    const router = useRouter();
    return (url) => {
        router.push(url, null, { shallow: false });
    }
}