namespace Core.Commands.PriceListItemCommands;

public class AddPriceListItemCommand : IRequest<long>
{
    public long PriceListId { get; set; }
    public List<string?> Values { get; set; } = [];
}