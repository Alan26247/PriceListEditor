namespace Web.Controllers;

[Route("api/price-list-item")]
[ApiController]
public class PriceListItemController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpPost("")]
    [SwaggerOperation(
            Summary = "Добавить товар в прайс лист",
            Description = "Добавляет товар в прайс лист",
            OperationId = "PriceListItem.Post",
            Tags = ["PriceListItem"]
        )]
    public async Task<IActionResult> AddPriceListAsync([FromBody] AddPriceListItemCommand command)
    {
        var response = await _mediator.Send(command);

        return this.GetResponse(201, response);
    }

    [HttpDelete("{id}")]
    [SwaggerOperation(
                Summary = "Удалить товар из прайс листа",
                Description = "Удалить товар из прайс листа",
                OperationId = "PriceListItem.Delete",
                Tags = ["PriceListItem"]
            )]
    public async Task<IActionResult> DeletePriceListItemAsync([FromRoute] long id)
    {
        var command = new DeletePriceListItemCommand { Id = id };

        await _mediator.Send(command);

        return NoContent();
    }

    [HttpGet("array")]
    [SwaggerOperation(
            Summary = "Получить список товаров прайс листа с учетом фильтров",
            Description = "Получить список товаров прайс листа с учетом фильтров",
            OperationId = "PriceListItem.List.Get",
            Tags = ["PriceListItem"]
        )]
    public async Task<IActionResult> GetPriceListItemArryaNewsList([FromQuery] GetPriceListItemArrayQuery query)
    {
        var response = await _mediator.Send(query);

        return this.GetResponse(200, response);
    }
}
