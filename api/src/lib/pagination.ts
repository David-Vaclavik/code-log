interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    offset: number;
    limit: number;
    hasMore: boolean;
  };
}

export function paginate<T>(
  data: T[],
  total: number,
  offset: number,
  limit: number
): PaginatedResult<T> {
  return {
    data,
    meta: {
      total,
      offset,
      limit,
      hasMore: offset + limit < total,
    },
  };
}
