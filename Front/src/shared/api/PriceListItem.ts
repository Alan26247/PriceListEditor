import { httpCore } from 'shared/configs/instance'

// ----- получение списка товаров прайс листа -----
export class GetPriceListItemArray {
  PriceListId: number | null = null;
  FindString: string = '';
  SortingColumnIndex: number | null = null;
  SortingIsAscending: boolean | null = null;
  PageNumber: number = 1;
  PageSize: number = 20;
}

export const getPriceListItemArray = (data: GetPriceListItemArray) => httpCore.get('api/price-list-item/array', {
  params: {
    PriceListId: data.PriceListId,
    FindString: data.FindString,
    SortingColumnIndex: data.SortingColumnIndex,
    SortingIsAscending: data.SortingIsAscending,
    PageNumber: data.PageNumber,
    PageSize: data.PageSize,
  }
});

// ----- добавление товар в прайс лист -----
export interface IAddPriceListItem {
  PriceListId: number,
  Values: string[],
}

export const addPriceListItem = (data: IAddPriceListItem) => httpCore.post('api/price-list-item', data);

// ----- удалить товар по id  -----
export const deletePriceListItem = (id: number) => httpCore.delete(`api/price-list-item/${id}`);