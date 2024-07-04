using Core.Common.Enums;

namespace Core.Handlers.PriceListItemHandlers;

public class AddPriceListItemHandler(IMapper mapper, IPriceListItemRepository priceListItemRepository,
    IPriceListRepository priceListRepository) : IRequestHandler<AddPriceListItemCommand, long>
{
    readonly IMapper _mapper = mapper;
    private readonly IPriceListRepository _priceListRepository = priceListRepository;
    private readonly IPriceListItemRepository _priceListItemRepository = priceListItemRepository;

    public async Task<long> Handle(AddPriceListItemCommand request, CancellationToken cancellationToken)
    {
        await CheckValues(request.PriceListId, request.Values!);

        var newPriceList = _mapper.Map<PriceListItem>(request);

        var id = await _priceListItemRepository.AddAsync(newPriceList);

        return id;
    }

    private async Task CheckValues(long priceListId, List<string> values)
    {
        var priceList = await _priceListRepository.GetAsync(priceListId);

        for (int i = 0; i < values.Count; i++)
        {
            if (priceList!.ColumnTypes[i] != (int)DataTypes.Number) continue;

            if (!long.TryParse(values[i], out _)) 
                throw new AppException(400, $"{priceList!.ColumnNames[i]} введен(о) не корректно");
        }
    }
}
