import {Injectable} from '@angular/core';
import {Post} from "./Models/post.model";
import {map, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = []
  private postUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient) {
  }

  //Updated the Post Array
  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  //Get Single Post
  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>("http://localhost:3000/api/posts/" + id)
  }

  //Get All Posts
  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')

      .pipe(map((postData) => {
        return postData.posts.map(post => {              //postData.posts --> Array with posts  .map --> new array with a set of rules
          return {
            title: post.title, content: post.content, id: post._id
          };
        });
      }))

      .subscribe((transformedPost) => {
          this.posts = transformedPost;
          this.postUpdated.next([...this.posts])
        }
      );
  }

  //Add a post
  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content}

    this.http.post<{ message: string, _id: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);

/*
        const backId = responseData._id              //created const id with the value of id we get from backend
        post.id = backId;                           //Assign the id of the post in frontend will have the same on from the backend
*/
        this.posts.push(post)
        this.postUpdated.next([...this.posts])
      });
  }

  //Update a post
  updatePost(id: string, title: string, content: string) {
    const post: Post = {id,title,content}
    this.http.put("http://localhost:3000/api/posts/" + id, post)
      .subscribe(response => {                //locally update posts
        const updatedPost = [...this.posts];      // clone posts
        const oldPostIndex = updatedPost.findIndex(p => p.id === post.id);
        updatedPost[oldPostIndex] = post;
        this.posts = updatedPost;
        this.postUpdated.next([...this.posts])

      })
  }

  //Delete a post
  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        console.log("Deleted");
        const updatedPosts = this.posts.filter(post => post.id !== postId); // FILTER subset,true false, keep the ones not deleted
        this.posts = updatedPosts
        this.postUpdated.next([...this.posts])
      })
  }

}
