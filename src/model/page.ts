// imformasi size
export type Paging = {
    size: number;
    total_page: number;
    current_page: number;
}

// page
export type Pageable<T> = {
    data: Array<T>;
    paging: Paging;
}