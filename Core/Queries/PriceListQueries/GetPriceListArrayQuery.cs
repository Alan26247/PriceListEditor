using Core.Common.Dtos;

namespace Core.Queries.PriceListQueries;

public class GetPriceListArrayQuery : IRequest<DataWithPaginationDto<List<PriceListArrayDto>>>
{
    public string? FindString { get; set; }
    public int? SortingColumnIndex { get; set; }
    public bool? SortingIsAscending { get; set; }

    public int? PageNumber { get; set; } = 1;
    public int? PageSize { get; set; } = 20;
}