import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostRepository } from "./posts.repository";

@Module({
    controllers : [PostsController],
    providers : [PostRepository]
})
export class PostModule{

}