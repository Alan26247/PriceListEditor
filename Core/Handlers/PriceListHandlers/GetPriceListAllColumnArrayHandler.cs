namespace Core.Handlers.PriceListHandlers;

public class GetPriceListAllColumnArrayHandler(IPriceListRepository priceListRepository)
    : IRequestHandler<GetPriceListAllColumnArrayQuery, List<string>>
{
    private readonly IPriceListRepository _priceListRepository = priceListRepository;

    public async Task<List<string>> Handle(GetPriceListAllColumnArrayQuery request,
        CancellationToken cancellationToken)
    {
        return await _priceListRepository.GetPriceListAllColumnArrayAsync();
    }
}
