export class Pagination {
  totalItems?: number;

  itemsPerPage?: number;

  currentPage: number;

  totalPages?: number;
}

export class PaginatedResponse<T> {
  data: T[];

  pagination?: Pagination;
}
