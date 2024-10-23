import {FC, useState, createContext, useContext, useMemo} from 'react'
import {
  ID,
  calculatedGroupingIsDisabled,
  calculateIsAllDataSelected,
  groupingOnSelect,
  initialListView,
  ListViewContextProps,
  groupingOnSelectAll,
} from '../../../../../_metronic/helpers'
import {useQueryResponse, useQueryResponseData} from './QueryResponseProvider'

const ListViewContext = createContext<ListViewContextProps>(initialListView);

const ListViewProvider: FC = ({children}) => {
  const [selected, setSelected] = useState<Array<ID>>(initialListView.selected);
  const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate);
  const [bookingIdToCancel, setBookingIdToCancel] = useState<any>(initialListView.bookingIdToCancel);
  const [importItems, setItemIdForImport] = useState(initialListView.importItems);
  const [exportItem, setExportItem] = useState(initialListView.exportItem);
  const {isLoading} = useQueryResponse();
  const data = useQueryResponseData();
  const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data]);
  const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected]);
  return (
    <ListViewContext.Provider
      value={{
        selected,
          bookingIdToCancel,
          setBookingIdToCancel,
        itemIdForUpdate,
        setItemIdForUpdate,
        importItems,
        setItemIdForImport,
        disabled,
        setExportItem: function (val:boolean) {
            setExportItem(val)
        },
        exportItem,
        isAllSelected,
        onSelect: (id: ID) => {
          groupingOnSelect(id, selected, setSelected)
        },
        onSelectAll: () => {
          groupingOnSelectAll(isAllSelected, setSelected, data)
        },
        clearSelected: () => {
          setSelected([])
        },
      }}
    >
      {children}
    </ListViewContext.Provider>
  )
};

const useListView = () => useContext(ListViewContext);

export {ListViewProvider, useListView}
