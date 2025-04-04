import { get } from "http";

interface LoadingType {
  message: string;
  state: boolean;
}

export const useLoading = () => {
  const getLoadingText = (loadingStates: LoadingType[]) => {
    const loadingState = loadingStates.filter((state) => state.state);

    if (loadingState.length > 0) {
      return loadingState[0].message;
    }
    return "Loading ...";
  };
  return { getLoadingText };
};
