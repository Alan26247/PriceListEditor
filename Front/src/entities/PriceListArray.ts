import { PriceListArrayItem } from "./PriceListArrayItem";

export class PriceListArray {
    data: PriceListArrayItem[] = [];
    pageNumber: number = 0;
    pageSize: number = 0;
    pageCount: number = 0;
    countItems: number = 0;
}