namespace Core.Common.MappingProfiles;

public class PriceListItemMapperProfile : Profile
{
    public PriceListItemMapperProfile()
    {
        CreateMap<AddPriceListItemCommand, PriceListItem>();

        CreateMap<PriceListItem, PriceListItemDto>();

        CreateMap<DataWithPaginationDto<List<PriceListItem>>, DataWithPaginationDto<List<PriceListItemDto>>>();
    }
}