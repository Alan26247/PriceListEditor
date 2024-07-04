using Core.Common.Dtos;

namespace Core.Common.Interfaces.IRepositories;

public interface IPriceListRepository : IRepository<PriceList>
{
    /// <summary>
    /// Получить список прайс листов
    /// </summary>
    /// <param name="pageNumber">Номер страницы</param>
    /// <param name="pageSize">Количество элементов на странице</param>
    /// <param name="findString">Строка поиска</param>
    /// <param name="sortingColumnIndex">Индекс столбца для сортировки</param>
    /// <param name="sortingIsAscending">Направление сортировки</param>
    /// <returns>Возвращает список прайс листов</returns>
    public Task<DataWithPaginationDto<List<PriceList>>> GetPriceListArrayAsync(int? pageNumber, int? pageSize,
        string? findString, int? sortingColumnIndex, bool? sortingIsAscending);

    /// <summary>
    /// Получить список названий всех имеющихся столбцов
    /// </summary>
    /// <returns>Возвращает список названий столбцов</returns>
    public Task<List<string>> GetPriceListAllColumnArrayAsync();
}