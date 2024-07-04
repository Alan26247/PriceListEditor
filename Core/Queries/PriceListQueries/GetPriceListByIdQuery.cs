using Core.Common.Dtos;

namespace Core.Queries.PriceListQueries;

public class GetPriceListByIdQuery : IRequest<PriceListDto?>
{
    public long Id { get; set; }
}