namespace Web.Controllers;

[Route("api/price-list")]
[ApiController]
public class PriceListController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpPost("")]
    [SwaggerOperation(
            Summary = "Добавить прайс лист",
            Description = "Добавляет новый прайс лист в базу данных",
            OperationId = "PriceList.Post",
            Tags = ["PriceList"]
        )]
    public async Task<IActionResult> AddPriceListAsync([FromBody] AddPriceListCommand command)
    {
        var response = await _mediator.Send(command);

        return this.GetResponse(201, response);
    }

    [HttpGet("{id}")]
    [SwaggerOperation(
                Summary = "Получить прайс лист по id",
                Description = "Получить прайс лист по id",
                OperationId = "PriceList.Get",
                Tags = ["PriceList"]
            )]
    public async Task<IActionResult> GetPriceListByIdAsync([FromRoute] long id)
    {
        var query = new GetPriceListByIdQuery { Id = id };

        var response = await _mediator.Send(query);

        return this.GetResponse(200, response);
    }

    [HttpGet("array")]
    [SwaggerOperation(
            Summary = "Получить список прайс листов с учетом фильтров",
            Description = "Получить список прайс листов с учетом фильтров",
            OperationId = "PriceList.List.Get",
            Tags = ["PriceList"]
        )]
    public async Task<IActionResult> GetPriceListArrayAsync([FromQuery] GetPriceListArrayQuery query)
    {
        var response = await _mediator.Send(query);

        return this.GetResponse(200, response);
    }

    [HttpGet("all/columns")]
    [SwaggerOperation(
            Summary = "Получить список всех имеющихся названий столбов",
            Description = "Получить список всех имеющихся названий столбов",
            OperationId = "PriceList.Column.List.Get",
            Tags = ["PriceList"]
        )]
    public async Task<IActionResult> GetPriceListAllColumnArrayAsync()
    {
        var query = new GetPriceListAllColumnArrayQuery();

        var response = await _mediator.Send(query);

        return this.GetResponse(200, response);
    }
}
