namespace Core.Handlers.PriceListItemHandlers;

public class DeletePriceListItemHandler(IPriceListItemRepository priceListItemRepository) : IRequestHandler<DeletePriceListItemCommand>
{
    private readonly IPriceListItemRepository _priceListItemRepository = priceListItemRepository;

    public async Task Handle(DeletePriceListItemCommand request, CancellationToken cancellationToken)
    {
        var currentPriceListItem = await _priceListItemRepository.GetAsync(request.Id)
            ?? throw new AppException(400, "Item not found.");

        await _priceListItemRepository.DeleteAsync(currentPriceListItem);
    }
}
