import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
    // type: ,
  })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
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
    return this.commentService.findOne(+id);
  }

  @HttpCode(200)
  @ApiResponse({
    status: 200,
    // type: ,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    // type: ,
  })
  async remove(@Param('id') id: string) {
    await this.commentService.remove(+id);
  }
}
