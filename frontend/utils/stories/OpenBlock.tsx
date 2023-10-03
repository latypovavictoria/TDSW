import { ReactNode } from "react";
import { useAppDispatch } from "redux/hooks";
import { setOpen } from "redux/reducers/nav/winSlice";

export interface OpenBlockProps {
  name: string;
  children: ReactNode;
}

function OpenBlock({ name, children }: OpenBlockProps) {
  const dispatch = useAppDispatch();
  dispatch(setOpen(name));
  return <>{children}</>;
}

export default OpenBlock;
