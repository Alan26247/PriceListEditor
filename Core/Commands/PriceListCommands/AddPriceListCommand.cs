namespace Core.Commands.PriceListCommands;

public class AddPriceListCommand : IRequest<long>
{
    public string Name { get; set; } = string.Empty;
    public List<ColumnDto> Columns { get; set; } = [];
}