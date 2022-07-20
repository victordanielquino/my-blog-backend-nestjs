
//export class UpdatePostDto extends PartialType(CreatePostDto){};

// TODO: para omitir algunos atributos del CreatePostDto aunque el front lo envie:
//export class UpdatePostDto extends PartialType(OmitType(CreatePostDto, ['slug'] as const)){};