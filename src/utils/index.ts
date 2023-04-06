import axios from "axios";
import { message } from "antd";
// import { apiKeyLocal } from "../localVariable";
import { allowedFileTypes } from "../mock/allowedFileTypes";
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

export const callTranscribeAPI = (
  apiKey: string,
  file: any,
  setData: Dispatch<SetStateAction<string>>,
  setLoader: Dispatch<SetStateAction<boolean>>
) => {
  // for checking api key
  if (!apiKey && apiKey.length < 10) {
    message.warning("Please provide valid API Key");
    return;
  }

  // for checking the existance of uploaded file
  if (!(file && file?.name)) {
    message.warning("Please upload file before proceeding");
    return;
  }

  // check for file size restricted to 25 MB
  if (file && file?.size) {
    if (Math.ceil(file?.size / 1e6) > 25) {
      message.warning("Please upload file below 25 MB");
      return;
    }
  }

  //to check allowed file types
  if (file && file?.type) {
    if (!allowedFileTypes.includes(file?.type)) {
      message.error("File extension not supported.");
      return;
    }
  }

  setLoader(true);
  // apiKey = apiKeyLocal;
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
      if(res?.data?.text === "") {
        setData("No speech found.");
      } else {
        setData(res?.data?.text);
      }

    })
    .catch((err) => {
      setData("Something went wrong.");
      setLoader(false);
      message.error("Something went wrong.")
    });
};
