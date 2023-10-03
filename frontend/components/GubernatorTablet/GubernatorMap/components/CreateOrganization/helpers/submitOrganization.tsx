import { mutate } from "swr";
import createOrganization from "@api/v2/organizations/create";
import isOkStatus from "@api/isOkStatus";

export function submitOrganization(
  organization: Partial<{
    name: string;
    width: string;
    longitude: string;
    town: string;
    hash: string;
  }>,
  onSuccess: () => void,
  onClose: () => void
) {
  return async () => {
    if (
      !organization.name ||
      !organization.width ||
      !organization.longitude ||
      !organization.town ||
      !organization.hash ||
      Number.isNaN(parseFloat(organization.width)) ||
      Number.isNaN(parseFloat(organization.longitude))
    )
      return;

    const newOrganization = {
      name: organization.name,
      width: parseFloat(organization.width),
      longitude: parseFloat(organization.longitude),
      town: organization.town,
      Hash: organization.hash,
      description: "",
    };

    const resp = await createOrganization(newOrganization);
    if (!isOkStatus(resp.status)) console.log(resp.message);
    mutate(["map_towns"]);
    onSuccess();
    onClose();
  };
}
