import { useState, useMemo } from "react";

export default function useSortableCompletedData(items, config = null) {
  const [sortSortedConfig, setSortConfig] = useState(config);
  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortSortedConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortSortedConfig.key] < b[sortSortedConfig.key]) {
          return sortSortedConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortSortedConfig.key] > b[sortSortedConfig.key]) {
          return sortSortedConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortSortedConfig]);

  const requestCompletedSort = (key) => {
    let direction = "ascending";
    setSortConfig({ key, direction });
  };

  return {
    completedItems: sortedItems,
    requestCompletedSort,
    sortSortedConfig,
  };
}
