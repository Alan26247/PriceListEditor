namespace Infrastructure.Data;

public class AutoMigrator(ApplicationDbContext context)
{
    private readonly ApplicationDbContext _context = context;

    public async Task Run()
    {
        await _context.Database.MigrateAsync();
    }
}
