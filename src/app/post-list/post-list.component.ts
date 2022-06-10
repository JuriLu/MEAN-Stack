import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../Models/post.model";
import {PostService} from "../post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = []
  private postSubscription: Subscription;
  isLoading: boolean = false

  constructor(public postService: PostService) {
  }

  ngOnInit() {
    this.isLoading = true
    this.postService.getPosts();
    this.postSubscription = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false
        this.posts = posts
      })
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId)
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe()
  }

}
