import { useEffect, useState } from "react";

export function useMaxPages(all_pages: number | undefined) {
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    if (all_pages) setMaxPages(all_pages);
  }, [all_pages]);

  return maxPages;
}
