import axios from "axios";
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

export const callTranscribeAPI = (
  apiKey: string,
  file: any,
  setData: Dispatch<SetStateAction<string>>,
  setLoader: Dispatch<SetStateAction<boolean>>
) => {  
  setLoader(true);
  const formData = new FormData();
  formData.append("file", file?.originFileObj);
  formData.append("model", "whisper-1");
  let headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "multipart/form-data",
  };
  axios
    .post("https://api.openai.com/v1/audio/transcriptions", formData, {
      headers: headers,
    })
    .then((res) => {
      setLoader(false);
      setData(res?.data?.text);
    })
    .catch((err) => {
      setData("Something went wrong.");
      setLoader(false);
    });
};
