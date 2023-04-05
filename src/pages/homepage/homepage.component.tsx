import { useState } from "react";
import React from "react";
import { Button, Input, Space } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import classes from "./homepage.module.css";
import type { UploadProps } from 'antd';
import { callTranscribeAPI } from "../../utils";

const { TextArea } = Input;
const { Dragger } = Upload;
const props :UploadProps = {
  name: "file",
  multiple: false,
  customRequest() {
    return;
  },
  onChange(info) {
    console.log("info:", info);
    // let { status } = info.file;
    info.file.status = "done";
    // console.log('status:', status);
    // if (status !== "uploading") {
    //   console.log(info.file, info.fileList);
    // }
    // if (status === "done") {
    //   message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (status === "error") {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
export const Homepage = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [transcriptData, setTranscriptData] = useState<string>("");
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e?.target?.value);
  };

  return (
    <div>
      <div>AI Audio Transcription</div>
      <div className={classes.mainHomepageContainer}>
        <div>
          <div className={classes.apiKeyInputContainer}>
            <Input placeholder="OpenAI API Key" onChange={handleApiKeyChange} />
            <p>
              If you don't have OpenAI API Key visit{" "}
              <a href="https://platform.openai.com/account/api-keys">here</a>{" "}
            </p>
          </div>
          <div className={classes.uploadFileContainer}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className={classes.requiredFilesText}>
                Support for a single. Please upload file with one of these
                formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
              </p>
            </Dragger>
          </div>
        </div>
        <div>
          <Button type="primary" onClick={() => callTranscribeAPI(apiKey,setTranscriptData)}>Transcript</Button>
          <Button type="primary" danger>Reset</Button>
        </div>
        <div className={classes.textAreaContainer}>
          <TextArea rows={6} />
        </div>
        <div><Button>Copy Text to Clipboard</Button></div>
      </div>
    </div>
  );
};
