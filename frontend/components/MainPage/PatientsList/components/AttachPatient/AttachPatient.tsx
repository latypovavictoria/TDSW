import useDettachedList from "@api/hooks/patients/useDettachedList";
import { CheckSharp } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { FC, useEffect, useState } from "react";
import attach from "@api/v2/patients/attach/doctor";
import EBox from "../../../../UI/EBox";
import UIButton from "@components/UI/Button";

export interface AttachPatientProps {
  onCancel: () => void;
}

const AttachPatient: FC<AttachPatientProps> = ({ onCancel }) => {
  const { t } = useTranslation("patients");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data: _pats } = useDettachedList({
    page,
    recs_per_page: 10,
  });

  const [pats, setPats] = useState(_pats?.result || []);

  useEffect(() => {
    if (_pats?.result.length === 0) {
      setHasMore(false);
    }
    setPats((pats) => [...pats, ...(_pats?.result || [])]);
  }, [_pats]);

  const [attached, setAttached] = useState<number[]>([]);

  return (
    <>
      <div className="z-10 mt-2 flex flex-grow basis-0 flex-col overflow-x-hidden overflow-y-scroll px-1">
        {pats?.length === 0 && <span className="ml-2">{t("no_patients")}</span>}
        {pats?.map((_p, index) => {
          const p = _p.user;
          const isi = _p.inspections_short_info;
          return (
            <EBox
              key={index}
              notched
              className="mt-1 mb-2 flex cursor-pointer items-center p-4"
              onClick={() => {
                if (attached.findIndex((e) => e === p.id) !== -1) return;
                attach(p.id);
                setAttached(attached.concat(p.id));
              }}
            >
              <span>
                {p.json_data?.lastName} {p.json_data?.firstName}
              </span>
              <>
                {!!p.tid && (
                  <span className="ml-1 text-alternate">#{p.tid}</span>
                )}
              </>
              <span className="ml-auto">
                <span className="text-green-500">
                  {isi.ok_inspections_count + isi.warn_inspections_count}
                </span>
                <span className="mx-1">-</span>
                <span className="text-red-500">
                  {isi.danger_inspections_count}
                </span>
              </span>
              <>
                {attached.findIndex((e) => e === p.id) !== -1 && (
                  <span className="ml-auto">
                    <CheckSharp />
                  </span>
                )}
              </>
            </EBox>
          );
        })}
        {hasMore && (
          <UIButton
            secondary
            onClick={() => setPage((p) => p + 1)}
            className="mt-2 p-1"
          >
            {t("loadMore")}
          </UIButton>
        )}
      </div>
      <UIButton secondary onClick={() => onCancel()} className="mt-2 p-1">
        {t("back")}
      </UIButton>
    </>
  );
};

export default AttachPatient;
