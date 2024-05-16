import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthJwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { FindOptionsDto } from './dto/find-options.dto';
import { user } from 'firebase-functions/v1/auth';
import { User } from 'firebase/auth';

@Controller('post')
@ApiTags('Posts')
@ApiInternalServerErrorResponse({ description: 'Oh, something went wrong' })
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @UseGuards(AuthJwtGuard)
  create(@Body() createPostDto: CreatePostDto, @CurrentUser() user) {
    return this.postService.create({ ...createPostDto, userId: user.uid });
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  findAll(@Query() query: FindOptionsDto) {
    const { page, limit, ...where } = query;
    return this.postService.findAll({
      pagination: { page: page, limit: limit },
      where,
    });
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  @UseGuards(AuthJwtGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: User,
  ) {
    await this.postService.update(id, updatePostDto, user.uid);
    return id;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
  })
  @UseGuards(AuthJwtGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    await this.postService.remove(id, user.uid);
    return id;
  }
}
