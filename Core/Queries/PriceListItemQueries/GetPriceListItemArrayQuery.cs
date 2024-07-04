using Core.Common.Dtos;

namespace Core.Queries.PriceListItemQueries;

public class GetPriceListItemArrayQuery : IRequest<DataWithPaginationDto<List<PriceListItemDto>>>
{
    public long PriceListId { get; set; }
    public string? FindString { get; set; }
    public int? SortingColumnIndex { get; set; }
    public bool? SortingIsAscending { get; set; }

    public int? PageNumber { get; set; } = 1;
    public int? PageSize { get; set; } = 20;
}