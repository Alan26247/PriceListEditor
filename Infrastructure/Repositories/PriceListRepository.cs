using System.Collections.Generic;

namespace Infrastructure.Repositories;

public class PriceListRepository(IDbContextFactory<ApplicationDbContext> dbFactory)
    : BaseRepository<PriceList>(dbFactory), IPriceListRepository
{
    public async Task<DataWithPaginationDto<List<PriceList>>> GetPriceListArrayAsync(int? pageNumber,
        int? pageSize, string? findString, int? sortingColumnIndex, bool? sortingIsAscending)
    {
        pageNumber ??= 1;
        pageSize ??= 20;

        using var _context = _dbFactory.CreateDbContext();

        IQueryable<PriceList> query = _context.PriceLists;

        if (!string.IsNullOrEmpty(findString))
        {
            query = query.Where(pl =>
                EF.Functions.ILike(pl.Name.ToLower(), $"%{findString.ToLower()}%"));
        }

        int count = await query.CountAsync();

        if (sortingColumnIndex is not null)
        {
            if (sortingColumnIndex == 0)
            {
                if (sortingIsAscending != null && (bool)sortingIsAscending)
                    query = query.OrderBy(pli => pli.Id);
                else
                    query = query.OrderByDescending(pli => pli.Id);
            }
            else
            {
                if (sortingIsAscending != null && (bool)sortingIsAscending)
                    query = query.OrderBy(pli => pli.Name);
                else
                    query = query.OrderByDescending(pli => pli.Name);
            }
        }
        else query = query.OrderByDescending(pli => pli.Id);

        int skipValue = PaginationHelper.GetSkipValue((int)pageNumber, (int)pageSize);

        query = query.Skip(skipValue).Take((int)pageSize);

        var entitys = await query.ToListAsync();

        var response = new DataWithPaginationDto<List<PriceList>>()
        {
            Data = entitys,
            PageNumber = (int)pageNumber,
            PageSize = (int)pageSize,
            PageCount = PaginationHelper.GetPageCount(count, (int)pageSize),
            CountItems = count,
        };

        return response;
    }

    public async Task<List<string>> GetPriceListAllColumnArrayAsync()
    {
        using var _context = _dbFactory.CreateDbContext();

        var priceLists = await _context.PriceLists.ToListAsync();

        var columnNames = new List<string>();

        foreach (var item in priceLists) columnNames.AddRange(item.ColumnNames);

        columnNames = columnNames.Distinct().ToList();

        columnNames.Remove("Название товара");
        columnNames.Remove("Артикул товара");

        columnNames = [.. columnNames.OrderBy(cn => cn)];


        return columnNames;
    }
}
