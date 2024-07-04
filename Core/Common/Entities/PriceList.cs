namespace Core.Common.Entities;

public class PriceList : BaseEntity
{
    [Comment("Название прайс листа")]
    public string Name { get; set; } = string.Empty;

    [Comment("Названия столбцов по порядку от первого до последнего")]
    public List<string> ColumnNames { get; set; } = [];

    [Comment("Типы данных столбцов по порядку от первого до последнего")]
    public List<int> ColumnTypes { get; set; } = [];

    public List<PriceListItem> Items { get; set; } = [];
}
