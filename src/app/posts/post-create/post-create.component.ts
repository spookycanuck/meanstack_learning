import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from '../post.model';
import { PostsService } from "../post.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle='';
  enteredContent='';


  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return
    }
    const post: Post = {
      id: form.value.id,
      title: form.value.title,
      content: form.value.content
    };
    this.postsService.addPost(form.value.id, form.value.title, form.value.content);
    form.resetForm();
  }
}
