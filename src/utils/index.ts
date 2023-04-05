type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);
export const callTranscribeAPI = (apiKey: string, setData: Dispatch<SetStateAction<string>>) => {
  console.log("call Api", apiKey);
};
