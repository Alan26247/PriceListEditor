using Core.Common.Dtos;

namespace Core.Common.Interfaces.IRepositories;

public interface IPriceListItemRepository : IRepository<PriceListItem>
{
    /// <summary>
    /// Получить список товаров прайс листа
    /// </summary>
    /// <param name="priceListId">ID прайс листа</param>
    /// <param name="findString">Строка поиска</param>
    /// <param name="pageNumber">Номер страницы</param>
    /// <param name="pageSize">Количество записей на странице</param>
    /// <param name="sortingColumnIndex">Индекс столбца для сортировки</param>
    /// <param name="sortingIsAscending">Направление сортировки</param>
    /// <returns>Возвращает список товаров прайс листа</returns>
    public Task<DataWithPaginationDto<List<PriceListItem>>> GetPriceListItemArrayAsync(long priceListId,
        string? findString, int? pageNumber, int? pageSize, int? sortingColumnIndex, bool? sortingIsAscending);
}
