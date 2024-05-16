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
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthJwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'firebase/auth';

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
  })
  @UseGuards(AuthJwtGuard)
  create(@Body() createPostDto: CreateLikeDto, @CurrentUser() user) {
    return this.likeService.create({ ...createPostDto, userId: user.uid });
  }

  @Get('/countLikesOnPost')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  likeForPost(@Query('postId') postId: string) {
    this.likeService.countLikeOnPost(postId);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
  })
  @UseGuards(AuthJwtGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    try {
      await this.likeService.remove(id, user.uid);
      return id;
    } catch (err) {
      throw err;
    }
  }
}
