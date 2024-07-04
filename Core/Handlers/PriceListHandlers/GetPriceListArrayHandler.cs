namespace Core.Handlers.PriceListHandlers;

public class GetPriceListArrayHandler(IMapper _mapper, IPriceListRepository priceListRepository)
    : IRequestHandler<GetPriceListArrayQuery, DataWithPaginationDto<List<PriceListArrayDto>>>
{
    private readonly IMapper _mapper = _mapper;
    private readonly IPriceListRepository _priceListRepository = priceListRepository;

    public async Task<DataWithPaginationDto<List<PriceListArrayDto>>> Handle(GetPriceListArrayQuery request,
        CancellationToken cancellationToken)
    {
        var repositoryResponse = await _priceListRepository.GetPriceListArrayAsync(request.PageNumber, request.PageSize,
            request.FindString, request.SortingColumnIndex, request.SortingIsAscending);

        var response = _mapper.Map<DataWithPaginationDto<List<PriceListArrayDto>>>(repositoryResponse);

        return response;
    }
}
