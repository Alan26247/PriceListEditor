namespace Core.Commands.PriceListItemCommands;

public class DeletePriceListItemCommand : IRequest
{
    public long Id { get; set; }
}