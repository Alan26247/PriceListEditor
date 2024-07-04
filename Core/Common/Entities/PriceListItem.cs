namespace Core.Common.Entities;

public class PriceListItem : BaseEntity
{
    [Comment("ID прайс листа")]
    public long PriceListId { get; set; }

    [Comment("Массив переменных")]
    public List<string?> Values { get; set; } = [];

    public required PriceList PriceList { get; set; }
}
