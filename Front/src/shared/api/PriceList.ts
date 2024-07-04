import { ColumnItem } from 'entities/ColumnItem';
import { httpCore } from 'shared/configs/instance'

// ----- получение списка прайс листов  -----
export class GetPriceListArray {
  FindString: string = '';
  SortingColumnIndex: number | null = null;
  SortingIsAscending: boolean | null = null;
  PageNumber: number = 1;
  PageSize: number = 20;
}

export const getPriceListArray = (data: GetPriceListArray) => httpCore.get('api/price-list/array', {
  params: {
    FindString: data.FindString,
    SortingColumnIndex: data.SortingColumnIndex,
    SortingIsAscending: data.SortingIsAscending,
    PageNumber: data.PageNumber,
    PageSize: data.PageSize,
  }
});
  
// ----- получить прайс лист по id  -----
export const getPriceListById = (id: number) => httpCore.get(`api/price-list/${id}`);

// ----- добавление прайс листа -----
export interface IAddPriceList {
  Name: string,
  Columns: ColumnItem[],
}

export const addPriceList = (data: IAddPriceList) => httpCore.post('api/price-list', data);

// ----- получить список названий имеющихся столбцов  -----
export const getPriceListAllColumns = () => httpCore.get(`api/price-list/all/columns`);