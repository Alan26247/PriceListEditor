namespace Web.Common.Extensions;

public static class ServicesExtension
{
    public static void AddServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();

        services.AddApplication();

        // ----- строка подключения к базе данных -----
        var connectionString = $"""
            Server={configuration["DB_SERVER"]};
            Port={configuration["DB_PORT"]};
            Database={configuration["DB_NAME"]};
            User Id={configuration["DB_USER"]};
            Password={configuration["DB_PASSWORD"]};
            """;

        services.AddInfrastructure(connectionString!);

        services.AddMapper();

        services.AddSwagger();

        services.AddCorsPolitics();

        services.AddTransient<AutoMigrator>();
    }
}