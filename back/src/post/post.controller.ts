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
    // type: ,
  })
  @UseGuards(AuthJwtGuard)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    // type: ,
  })
  findAll() {
    console.log('dsads');
    return this.postService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    // type: ,
  })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    // type: ,
  })
  @UseGuards(AuthJwtGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    // type: ,
  })
  @UseGuards(AuthJwtGuard)
  async remove(@Param('id') id: string) {
    await this.postService.remove(id);
    return;
  }
}
