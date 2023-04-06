import React, { useEffect, useRef, useState } from "react";
import { Button, Input, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import classes from "./homepage.module.css";
import { callTranscribeAPI } from "../../utils";
import { Loader } from "../../components/loader/loader.component";
import { allowedFileTypes } from "../../mock/allowedFileTypes";

const { TextArea } = Input;
const { Dragger } = Upload;

export const Homepage = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [transcriptData, setTranscriptData] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>({});
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const onRemoveTriggered = useRef<boolean>(false);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e?.target?.value);
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    customRequest() {
      return;
    },
    onChange(info) {
      if (!onRemoveTriggered.current) {
        info.file.status = "done";
        setSelectedFile(info?.file);
      } else {
        onRemoveTriggered.current = false;
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove() {
      setSelectedFile({});
      onRemoveTriggered.current = true;
    },
  };

  return (
    <>
      {showLoader && <Loader></Loader>}
      <div>
        {/* <div className={classes.heading}>AI Audio Transcription</div> */}
        <div className={classes.mainHomepageContainer}>
          <div>
            <div className={classes.apiKeyInputContainer}>
              <Input
                placeholder="OpenAI API Key"
                onChange={handleApiKeyChange}
              />
              <p>
                If you don't have OpenAI API Key visit{" "}
                <a href="https://platform.openai.com/account/api-keys" target="_blank">here</a>{" "}
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
                  formats: mp3, mpeg, or wav. File uploads are currently limited to 25 MB.
                </p>
              </Dragger>
            </div>
            <div>
              {(selectedFile?.originFileObj && allowedFileTypes.includes(selectedFile?.type)) && (
                <audio controls className={classes.audioControl}>
                  <source
                    src={URL.createObjectURL(selectedFile?.originFileObj)}
                    type={selectedFile?.originFileObj?.type}
                  />
                </audio>
              )}
            </div>
          </div>
          <div>
            <Button
              type="primary"
              onClick={() =>
                callTranscribeAPI(apiKey, selectedFile, setTranscriptData, setShowLoader)
              }
            >
              Transcript
            </Button>
          </div>
          <div className={classes.textAreaContainer}>
            <TextArea rows={6} value={transcriptData} />
          </div>
          <div>
            <Button>Copy Text to Clipboard</Button>
          </div>
        </div>
      </div>
    </>
  );
};
