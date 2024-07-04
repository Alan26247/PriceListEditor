namespace Core.Common.Extensions;
public static class InfrastructureExtension
{
    public static void AddInfrastructure(this IServiceCollection services, string dbConnectionString)
    {
        // ----- database -----
        services.AddDbContextFactory<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(dbConnectionString);
        });

        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(dbConnectionString);
        });

        // ----- repositories ------
        services.AddScoped<IPriceListRepository, PriceListRepository>();
        services.AddScoped<IPriceListItemRepository, PriceListItemsRepository>();
    }
}
