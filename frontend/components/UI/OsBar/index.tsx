import { useState } from "react";

import OsBar from "./OsBar";

export default function OsBarContainer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-20 h-8 w-max">
      <OsBar onLeave={() => setOpen(false)} open={open} />
      <div
        className="absolute left-0 right-0 bottom-1/3 z-50 m-2 flex h-full"
        onMouseEnter={() => {
          setOpen(true);
        }}
      ></div>
    </div>
  );
}
