import axios from "axios";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import useInspectionVideos, {
  mutateInspectionVideos,
} from "@api/hooks/inspections/useInspectionsVideos";
import isOkStatus from "@api/isOkStatus";
import video from "@api/v2/inspections/delete/video";

import CustomModal from "@components/UI/CustomModal";
import EBox from "@components/UI/EBox";

import { error } from "utils/toast";
import UIButton from "@components/UI/Button";

const VideosList = ({
  inspectionId,
  show,
  onClose,
}: {
  inspectionId: number;
  show: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation("inspections");

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const list = useInspectionVideos(inspectionId);

  const uploadVideo = async () => {
    const resp = await axios({
      method: "POST",
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: `v2/inspections/attach/video/${inspectionId}`,
      headers: { "Content-Type": "video/mp4" },
      data: videoFile,
      withCredentials: true,
    });
    const status = resp.data?.status;
    if (isOkStatus(status || -1)) {
      setAddingNew(false);
      mutateInspectionVideos(inspectionId);
    } else {
      error(resp.data?.message || "Error");
    }
  };

  const deleteVideo = async () => {
    if (!selectedVideo) return;
    await video(selectedVideo);

    mutateInspectionVideos(inspectionId);
    setSelectedVideo(null);
  };

  return (
    <CustomModal
      show={show}
      onClose={() => {
        setSelectedVideo(null);
        setAddingNew(false);
        setVideoFile(null);
        onClose();
      }}
    >
      <EBox
        className="max-h-[70vh] p-2"
        bgColor="#002a33"
        header={<div className="p-2">{t("videos")}</div>}
      >
        <div className="flex flex-row">
          <div className="flex h-full flex-col border-r border-[#4dffff]">
            {list.data?.videos.map((v, i) => (
              <span
                key={i}
                className={`min-w-[10rem] cursor-pointer p-2 text-center ${
                  selectedVideo === v.file_hash ? "bg-bg-active" : ""
                }`}
                onClick={() => {
                  setSelectedVideo(v.file_hash);
                  setAddingNew(false);
                }}
              >
                {i + 1}
              </span>
            ))}
            <span
              className={`min-w-[10rem] cursor-pointer p-2 text-center ${
                addingNew ? "bg-bg-active" : ""
              }`}
              onClick={() => {
                setSelectedVideo(null);
                setAddingNew(true);
              }}
            >
              +
            </span>
          </div>
          <div className="p-4">
            {selectedVideo ? (
              <div className="flex flex-col gap-2">
                <video
                  src={`${process.env.NEXT_PUBLIC_API_URL}/v2/inspections/get/video/${selectedVideo}`}
                  className="max-h-[60vh] max-w-[80vw]"
                  controls
                />
                <UIButton className="ml-auto p-1" onClick={() => deleteVideo()}>
                  {t("delete")}
                </UIButton>
              </div>
            ) : addingNew ? (
              <div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setVideoFile(e.target.files[0]);
                  }}
                />
                <UIButton className="p-1" onClick={() => uploadVideo()}>
                  {t("upload")}
                </UIButton>
              </div>
            ) : (
              <span>{t("selectAVideo")}</span>
            )}
          </div>
        </div>
      </EBox>
    </CustomModal>
  );
};

export default VideosList;
