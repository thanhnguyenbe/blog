/* exercices openclassrooms.com Nguyen thi */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  blogForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private blogService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
      this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSaveBlog() {
    const title = this.blogForm.get('title').value;
    const content = this.blogForm.get('content').value;
    const newBlog = new Blog(title, content);
    newBlog.loveIts = 0;
    newBlog.created =  Date.now();

    this.blogService.createBlog(newBlog);
    this.onBack();

  }

  onBack() {
    this.blogService.gotoParent();
  }


}
