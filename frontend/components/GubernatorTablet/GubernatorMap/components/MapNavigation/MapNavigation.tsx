import { organizationsType } from "@api/schemas";

import EBox from "@components/UI/EBox/EBox";

import { useAppDispatch } from "redux/hooks";
import { setCenter } from "redux/reducers/adminMap/admMapSlice";

import { useMapData } from "./hooks/useMapData";

const MapNavigation = () => {
  const dispatch = useAppDispatch();

  const data = useMapData();

  const onClickOnFactory = (f: organizationsType) => () =>
    dispatch(setCenter([f.width, f.longitude]));

  return (
    <div>
      {Object.keys(data).map((d, i) => {
        const orgs = data[d];
        return (
          <div key={i}>
            <span className="text-2xl font-semibold">{d}</span>
            <div className="mt-3 ml-5 mr-2 flex list-disc flex-col gap-2">
              {orgs.map((factory, index) => (
                <EBox
                  notched
                  key={index}
                  onClick={onClickOnFactory(factory)}
                  className="cursor-pointer p-4"
                >
                  {factory.name}
                </EBox>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MapNavigation;
