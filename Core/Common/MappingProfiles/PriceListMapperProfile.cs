namespace Core.Common.MappingProfiles;

public class PriceListMapperProfile : Profile
{
    public PriceListMapperProfile()
    {
        CreateMap<PriceList, PriceListArrayDto>();

        CreateMap<DataWithPaginationDto<List<PriceList>>, DataWithPaginationDto<List<PriceListArrayDto>>>();
    }
}
