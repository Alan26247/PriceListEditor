using Web.Common.Middlewares;

namespace Web.Common.Extensions
{
    public static class MiddlewaresExtension
    {
        public static void UseMiddlewares(this WebApplication app)
        {
            app.UseHttpsRedirection();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseCors("AllowAllPolicy");

            app.UseSwagger();
            app.UseAppSwagger();

            app.UseMiddleware<InterceptorExceptionsMiddleware>();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllers();
        }
    }
}
