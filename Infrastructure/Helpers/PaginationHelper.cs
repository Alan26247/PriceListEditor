namespace Infrastructure.Helpers;

public static class PaginationHelper
{
    public static int GetSkipValue(int numberPage, int pageSize)
    {
        return (numberPage - 1) * pageSize;
    }

    public static int GetPageCount(int itemCount, int pageSize)
    {
        if (itemCount <= pageSize) return 1;

        int result = itemCount / pageSize;
        if (itemCount % pageSize != 0)
        {
            result++;
        }
        return result;
    }
}
