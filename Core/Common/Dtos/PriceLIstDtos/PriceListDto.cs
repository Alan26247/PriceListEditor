namespace Core.Common.Dtos.PriceLIstDtos;

public class PriceListDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<ColumnDto> Columns { get; set; } = [];
}
