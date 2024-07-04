namespace Core.Handlers.PriceListItemHandlers;

public class GetPriceListItemArrayHandler(IMapper mapper, IPriceListItemRepository newsRepository)
    : IRequestHandler<GetPriceListItemArrayQuery, DataWithPaginationDto<List<PriceListItemDto>>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IPriceListItemRepository _newsRepository = newsRepository;

    public async Task<DataWithPaginationDto<List<PriceListItemDto>>> Handle(GetPriceListItemArrayQuery request,
        CancellationToken cancellationToken)
    {
        var repositoryResponse = await _newsRepository.GetPriceListItemArrayAsync(request.PriceListId, request.FindString,
            request.PageNumber, request.PageSize, request.SortingColumnIndex, request.SortingIsAscending);

        var response = _mapper.Map<DataWithPaginationDto<List<PriceListItemDto>>>(repositoryResponse);

        return response;
    }
}
