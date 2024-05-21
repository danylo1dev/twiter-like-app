import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'firebase/auth';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthJwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
@ApiTags('Comments')
@ApiInternalServerErrorResponse({ description: 'Oh, something went wrong' })
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 200,
    description: 'Created',
  })
  @UseGuards(AuthJwtGuard)
  create(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user) {
    return this.commentService.create({
      ...createCommentDto,
      userId: user.uid,
      username: `${user.firstName} ${user.lastName}`,
    });
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    // type: ,
  })
  findAll() {
    return this.commentService.findAll();
  }
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    // type: ,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOneById(id);
  }

  @HttpCode(200)
  @ApiResponse({
    status: 200,
    // type: ,
  })
  @Patch(':id')
  @UseGuards(AuthJwtGuard)
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser() user: User,
  ) {
    return this.commentService.update(id, updateCommentDto, user.uid);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    // type: ,
  })
  @UseGuards(AuthJwtGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    await this.commentService.remove(id, user.uid);
  }
}
