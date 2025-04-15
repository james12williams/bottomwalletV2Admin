import {Dispatch, SetStateAction} from 'react'
import {boolean} from "yup";

export type ID = undefined | null | number | string

export type PaginationState = {
  page: number
  per_page: 10 | 15 | 30 | 50 | 100
  links?: Array<{label: string; active: boolean; url: string | null; page: number | null}>
}

export type SortState = {
  sort?: string
  order?: 'asc' | 'desc'
}

export type FilterState = {
  filter?: unknown
}

export type SearchState = {
  search?: string
}

export type Response<T> = {
  data?: T
  payload?: {
    message?: string
    errors?: {
      [key: string]: Array<string>
    }
    pagination?: PaginationState
  }
}

export type QueryState = PaginationState & SortState & FilterState & SearchState

export type QueryRequestContextProps = {
  isFirst: boolean
  state: QueryState
  updateState: (updates: Partial<QueryState>) => void
}

export const initialQueryState: QueryState = {
  page: 1,
  per_page: 15,
};

export const initialQueryRequest: QueryRequestContextProps = {
  isFirst: false,
  state: initialQueryState,
  updateState: () => {},
};

export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined
  refetch: () => void
  isLoading: boolean
  query: string
}

export const initialQueryResponse = {refetch: () => {}, isLoading: false, query: ''}

export type ListViewContextProps = {
  selected: Array<ID>
  onSelect: (selectedId: ID) => void
  onSelectAll: () => void
  clearSelected: () => void
  setExportItem: (selectedId: boolean) => void
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  query?: string
  itemIdForUpdate?: ID
  bookingIdToCancel?: any
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>
  setBookingIdToCancel: Dispatch<SetStateAction<ID>>
  importItems: boolean
  setItemIdForImport: Dispatch<SetStateAction<boolean>>
  isAllSelected: boolean
  exportItem: boolean
  disabled: boolean
}

export const initialListView: ListViewContextProps = {
  selected: [],
  onSelect: () => {},
  onSelectAll: () => {},
  clearSelected: () => {},
  setItemIdForUpdate: () => {},
  setBookingIdToCancel: () => {},
  setItemIdForImport: () => {},
  setExportItem: () => {},
  query: '',
  isAllSelected: false,
  importItems: false,
  exportItem: false,
  disabled: false,
};
