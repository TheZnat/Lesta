// utils/pagination.ts
export const paginate = (items: any[], page: number, itemsPerPage: number) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};
