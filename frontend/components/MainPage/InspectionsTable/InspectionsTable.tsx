import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AppBlock } from "types";

import useInspectionList from "@api/hooks/inspections/useInspectionList";
import usePatient from "@api/hooks/patients/usePatient";

import EBox from "@components/UI/EBox";

import VideosList from "./components/VideosList";
import CreateInspectionModal from "./components/CreateModal";
import ExportModal from "./components/ExportModal";
import Header from "./components/Header";
import FileModal from "./components/FileModal";

import { useFileType } from "./hooks/useFileType";
import { useInspType } from "./hooks/useInspType";
import { useMaxPages } from "./hooks/useMaxPages";
import { useSaveInspType } from "./hooks/useSaveInspType";

import { getDataOfInspection } from "./helpers/getDataOfInspection";
import { getHeadersOfInspectionType } from "./helpers/getHeadersOfInspectionType";
import { getResultString } from "./helpers/getResultString";

import styles from "./InspectionsTable.module.css";

import { useAppSelector } from "redux/hooks";

const InspectionsTable: AppBlock = () => {
  const { t } = useTranslation("inspections");

  const patientId = useAppSelector((state) => state.patients.currentPatientId);
  const { data: patient } = usePatient(patientId);

  const [inspType, setInspType] = useInspType();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [manageFile, setManageFile] = useState(-1);
  const [viewVideos, setViewVideos] = useState(-1);

  const [createNew, setCreateNew] = useState(false);
  const [exportFile, setExportFile] = useState(false);

  const { data: _insps, isValidating } = useInspectionList({
    inspection_type: inspType[0],
    patient_id: patientId,
    page,
    recs_per_page: perPage,
  });

  const insps = useMemo(
    () =>
      _insps || {
        inspection_data_list: [],
        all_pages: 0,
      },
    [_insps]
  );

  const maxPages = useMaxPages(_insps?.all_pages);
  useSaveInspType(inspType);
  const fileType = useFileType(inspType);

  if (
    !useAppSelector(
      (state) => state.window.open[InspectionsTable.block_name]
    ) ||
    patientId === -1
  )
    return <></>;

  const headers = getHeadersOfInspectionType(inspType[0]);

  return (
    <>
      <CreateInspectionModal
        open={createNew}
        onClose={() => {
          setCreateNew(false);
        }}
        patientId={patientId}
        tid={patient?.user.tid}
        type={inspType[0]}
        fileType={fileType}
      />

      <FileModal
        id={manageFile}
        open={manageFile !== -1}
        onClose={() => {
          setManageFile(-1);
        }}
        fileType={fileType}
      />

      <VideosList
        inspectionId={viewVideos}
        onClose={() => setViewVideos(-1)}
        show={viewVideos !== -1}
      />

      <ExportModal
        onClose={() => setExportFile(false)}
        show={exportFile}
        data={{
          inspection_type: inspType[0],
          patient_id: patientId,
          page,
          recs_per_page: perPage,
        }}
      />

      <EBox
        header={
          <Header
            inspType={inspType}
            maxPages={maxPages}
            page={page}
            perPage={perPage}
            setCreateNew={setCreateNew}
            setExportFile={setExportFile}
            setInspType={setInspType}
            setPage={setPage}
            setPerPage={setPerPage}
          />
        }
        className="flex-grow-1 flex flex-col items-stretch p-2"
      >
        <div className="flex-grow-1 flex flex-col items-stretch overflow-x-auto">
          {insps.inspection_data_list.length === 0 ? (
            isValidating ? (
              <span>{t("loading")}</span>
            ) : (
              <span>{t("noInspections")}</span>
            )
          ) : (
            <table className={`${styles.table} flex-grow-1`}>
              <thead>
                <tr>
                  <th>{t("type")}</th>
                  <th>{t("date")}</th>
                  {headers?.map((h, i) => (
                    <th key={i}>{t(h)}</th>
                  ))}
                  <th>{t("allowance.title")}</th>
                  <th>{t("result")}</th>
                  <th>{t("videos")}</th>
                  {!!fileType && <th>{t("file")}</th>}
                  {inspType[0] === "ecg" && <th>{t("detailsTitle")}</th>}
                </tr>
              </thead>
              <tbody>
                {insps.inspection_data_list.map((item, index) => {
                  const i = item;
                  return (
                    <tr key={index}>
                      <td>{t(`types.${i.inspection_type}`)}</td>
                      <td>{i.datetime_created_formated}</td>
                      {getDataOfInspection(i).map((d, ind) => (
                        <td
                          key={ind}
                          style={{
                            color: d.color,
                            fontWeight: d.bold ? "bold" : "normal",
                          }}
                        >
                          {t(d.value)}
                        </td>
                      ))}
                      <td>
                        <span
                          style={{
                            color: i.access ? undefined : "#ea580c",
                            fontWeight: i.access ? undefined : "bold",
                          }}
                        >
                          {i.access ? t("allowance.yes") : t("allowance.no")}
                        </span>
                      </td>
                      <td>{getResultString(i.result)}</td>
                      <td
                        className="cursor-pointer"
                        onClick={() => setViewVideos(i.id)}
                      >
                        {i.video_count && i.video_count > 0
                          ? `${i.video_count} - ${t("details")}`
                          : t("noVideos")}
                      </td>
                      {!!fileType && (
                        <td
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => setManageFile(i.id)}
                        >
                          {t("fileControl")}
                        </td>
                      )}
                      {i.inspection_type === "ecg" && (
                        <td>
                          <Link href={`/ecg/${i.id}`}>{t("details")}</Link>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </EBox>
    </>
  );
};

InspectionsTable.block_name = "InspectionsTable";

export default InspectionsTable;
