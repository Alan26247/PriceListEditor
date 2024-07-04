import { PriceListItem } from "./PriceListItem";

export class PriceListItemArray {
    data: PriceListItem[] = [];
    pageNumber: number = 0;
    pageSize: number = 0;
    pageCount: number = 0;
    countItems: number = 0;
}