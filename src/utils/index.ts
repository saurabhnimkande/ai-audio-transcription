import axios from "axios";

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

export const callTranscribeAPI = (
  apiKey: string,
  file: any,
  setData: Dispatch<SetStateAction<string>>
) => {
  
};
