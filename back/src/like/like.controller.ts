import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('like')
@ApiTags('like')
@ApiInternalServerErrorResponse({ description: 'Oh, something went wrong' })
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Created',
    // type: ,
  })
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto);
  }

  @Get(':postId')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    // type: ,
  })
  findAll(@Param('postId') postId: string) {
    return this.likeService.findLikeForPost(postId);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    // type: ,
  })
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    // type: ,
  })
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likeService.update(id, updateLikeDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 204,
    // type: ,
  })
  async remove(@Param('id') id: string) {
    await this.likeService.remove(id);
    return;
  }
}
