import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'firebase/auth';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthJwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { FindOptionsDto } from './dto/find-options.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { ResponsePostDto } from './dto/response-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
@ApiTags('Posts')
@ApiInternalServerErrorResponse({ description: 'Oh, something went wrong' })
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: String,
  })
  @UseGuards(AuthJwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    return this.postService.create(
      {
        ...createPostDto,
        userId: user.uid,
        username: `${user.firstName} ${user.lastName}`,
        userPhotoUrl: user.photoURL || '',
      },
      file.buffer,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ResponsePostDto],
  })
  async findAll(@Query() query: FindOptionsDto): Promise<ResponsePostDto[]> {
    const { page, limit, ...where } = query;
    return await this.postService.findAll({
      pagination: { page: page, limit: limit },
      where,
    });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponsePostDto,
  })
  findOne(@Param('id') id: string): Promise<ResponsePostDto> {
    console.log(id);
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
  })
  @UseGuards(AuthJwtGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: User,
  ): Promise<string> {
    await this.postService.update(id, updatePostDto, user.uid);
    return id;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted',
  })
  @UseGuards(AuthJwtGuard)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.postService.remove(id, user.uid);
    return null;
  }
  @Post(':postId/like')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
  })
  @UseGuards(AuthJwtGuard)
  async createPostLike(
    @Param('postId') postId: string,
    @CurrentUser() user: User,
  ) {
    return await this.postService.createPostLike({
      postId: postId,
      userId: user.uid,
    });
  }
}
