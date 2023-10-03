import { Map, Placemark } from "@pbe/react-yandex-maps";

import useAllOrganizations from "@api/hooks/organizations/useAllOrganizations";

import { useAppSelector } from "redux/hooks";

const RawMap = () => {
  const { data: respData } = useAllOrganizations();

  const center = useAppSelector((state) => state.adminMap.center);

  return (
    <Map
      state={{
        center: center,
        zoom: 10.5,
      }}
      options={{
        avoidFractionalZoom: false,
      }}
      className="h-[60vh]"
    >
      {respData?.organizations?.map((org, i) => (
        <Placemark
          key={i}
          geometry={[org.width, org.longitude]}
          options={{
            preset: "islands#nightFactoryCircleIcon",
          }}
        />
      ))}
    </Map>
  );
};

export default RawMap;
