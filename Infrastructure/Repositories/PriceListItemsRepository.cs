namespace Infrastructure.Repositories;

public class PriceListItemsRepository(IDbContextFactory<ApplicationDbContext> dbFactory)
    : BaseRepository<PriceListItem>(dbFactory), IPriceListItemRepository
{
    public async Task<DataWithPaginationDto<List<PriceListItem>>> GetPriceListItemArrayAsync(long priceListId,
        string? findString, int? pageNumber, int? pageSize, int? sortingColumnIndex, bool? sortingIsAscending)
    {
        pageNumber ??= 1;
        pageSize ??= 20;

        using var _context = _dbFactory.CreateDbContext();

        IQueryable<PriceListItem> query = _context.PriceListItems.Where(pl => pl.PriceListId == priceListId);

        query = query.Where(pl => pl.PriceListId == priceListId);

        if (!string.IsNullOrEmpty(findString))
        {
            query = query.Where(pl =>
                EF.Functions.ILike(pl.Values[0]!.ToLower(), $"%{findString.ToLower()}%") ||
                EF.Functions.ILike(pl.Values[1]!.ToLower(), $"%{findString.ToLower()}%"));
        }

        int count = await query.CountAsync();

        if (sortingColumnIndex is not null)
        {
            if (sortingIsAscending != null && (bool)sortingIsAscending)
                query = query.OrderBy(pli => pli.Values[(int)sortingColumnIndex]);
            else
                query = query.OrderByDescending(pli => pli.Values[(int)sortingColumnIndex]);
        }
        else query = query.OrderByDescending(pli => pli.Id);

        int skipValue = PaginationHelper.GetSkipValue((int)pageNumber, (int)pageSize);

        query = query.Skip(skipValue).Take((int)pageSize);

        var entitys = await query.ToListAsync();

        var response = new DataWithPaginationDto<List<PriceListItem>>()
        {
            Data = entitys,
            PageNumber = (int)pageNumber,
            PageSize = (int)pageSize,
            PageCount = PaginationHelper.GetPageCount(count, (int)pageSize),
            CountItems = count,
        };

        return response;
    }
}
