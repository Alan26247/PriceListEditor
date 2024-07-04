using Microsoft.AspNetCore.Server.Kestrel.Core;
using System.Net;

namespace Web.Common.Extensions;

public static class KestrelExtension
{
    public static void KestrelSetup(this WebApplicationBuilder builder)
    {
#if !DEBUG
        builder.WebHost.ConfigureKestrel((context, serverOptions) =>
        {
            serverOptions.Listen(
                IPAddress.Any,
                builder.Configuration.GetValue<int>("HTTP_PORT"),
                listenOptions =>
                {
                    listenOptions.Protocols = HttpProtocols.Http1;
                });
        });
#endif
    }
}