import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PostService} from "../post.service";
import {ActivatedRoute, ParamMap, Route, Router} from "@angular/router";
import {Post} from "../Models/post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  singlePost: Post;
  isLoading:boolean = false;
  private mode = 'create';
  private postId: string;

  constructor(
    public postService: PostService,
    public activatedRoute: ActivatedRoute,
    public router: Router) {}

  ngOnInit() {
    //check for params to determine Edit Mode or New Mode
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.singlePost = {id: postData._id, title: postData.title, content: postData.content}
        })
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content)
    } else {
      this.postService.updatePost(this.postId,form.value.title, form.value.content)
    }
    form.resetForm();
    this.router.navigate(['/'],{relativeTo: this.activatedRoute})

  }

}
