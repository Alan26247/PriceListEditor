namespace Core.Handlers.PriceListHandlers;

public class GetPriceListByIdHandler(IPriceListRepository priceListRepository)
    : IRequestHandler<GetPriceListByIdQuery, PriceListDto?>
{
    private readonly IPriceListRepository _priceListRepository = priceListRepository;

    public async Task<PriceListDto?> Handle(GetPriceListByIdQuery request,
        CancellationToken cancellationToken)
    {
        // ----- получаем сущность из БД -----
        var priceList = await _priceListRepository.GetAsync(request.Id);

        if (priceList == null) return null;

        // ----- собираем столбцы -----
        var columns = new List<ColumnDto>();

        for (var i = 0; i < priceList!.ColumnNames.Count; i++)
        {
            columns.Add(new ColumnDto
            {
                Name = priceList.ColumnNames[i],
                DataType = priceList.ColumnTypes[i],
            });
        }

        // ----- собираем dto и возвращаем результат -----
        var newPriceListDto = new PriceListDto
        {
            Id = priceList.Id,
            Name = priceList.Name,
            Columns = columns,
        };

        return newPriceListDto;
    }
}
