using Core.Common.Enums;

namespace Core.Handlers.PriceListHandlers;

public class AddPriceListHandler(IPriceListRepository channelRepository) : IRequestHandler<AddPriceListCommand, long>
{
    private readonly IPriceListRepository _priceListRepository = channelRepository;

    public async Task<long> Handle(AddPriceListCommand request, CancellationToken cancellationToken)
    {
        // ----- проверяем входные данные -----
        CheckValues(request.Columns);

        // ----- создаем дефолтные колонки -----
        var columns = new List<ColumnDto>
        {
            new() {
                Name = "Название товара",
                DataType = (int)DataTypes.String,
            },
            new() {
                Name = "Код товара",
                DataType = (int)DataTypes.Number,
            }
        };

        columns.AddRange(request.Columns);

        // ----- добавляем новую сущность в БД -----
        var newPriceList = new PriceList
        {
            Name = request.Name,
            ColumnNames = columns.Select(x => x.Name).ToList()!,
            ColumnTypes = columns.Select(x => x.DataType).ToList()!,
        };

        var id = await _priceListRepository.AddAsync(newPriceList);

        return id;
    }

    private static void CheckValues(List<ColumnDto> Columns)
    {
        foreach (var column in Columns)
        {
            if (column.DataType > 2 || column.DataType < 0)
                throw new AppException(400, "Некорректный тип данных");
        }
    }
}
