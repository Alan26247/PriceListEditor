namespace Web.Common.Extensions;

public static class CorsExtentions
{
    public static void AddCorsPolitics(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAllPolicy",
                builder =>
                {
#if DEBUG
                    builder.WithOrigins("http://localhost:3000")
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
#else
                    builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true)
                    .AllowAnyOrigin();
                    //.AllowCredentials();
#endif
                });
        });
    }
}