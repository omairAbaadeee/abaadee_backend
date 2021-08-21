import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  
}
