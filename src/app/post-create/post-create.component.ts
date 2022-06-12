import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../post.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Post} from "../Models/post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  private postId: string;
  private mode = 'create';
  singlePost: Post;
  isLoading: boolean = false;
  form: FormGroup;

  constructor(
    public postService: PostService,
    public activatedRoute: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit() {
    //Initialize the form
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.min(3)
      ]),
      content: new FormControl(null, [
        Validators.required,
        Validators.min(3)
      ]),
    })

    //check for params to determine Edit Mode or New Mode
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.singlePost = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
          this.form.setValue({
            title: this.singlePost.title,
            content: this.singlePost.content
          })
        })
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  onSavePost() {
    if (this.form.invalid) {
      return
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(
        this.form.value.title,
        this.form.value.content
      )
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }
    this.form.reset();
    this.router.navigate(['/'], {relativeTo: this.activatedRoute})

  }

}
