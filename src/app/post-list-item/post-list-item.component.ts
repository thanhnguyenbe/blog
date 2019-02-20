/* exercices openclassrooms.com Nguyen thi */
import {Component, Input, OnInit} from '@angular/core';
import { Blog } from '../models/blog';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  blog: Blog;
  aBlanc = '   ';

  constructor(private route: ActivatedRoute,
              private blogService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.blog = new Blog('', '');
    const id = this.route.snapshot.params['id'];
    this.blogService.getBlogItem(+id).then(
      (blog: Blog) => {
        this.blog = blog;
      }
    );
  }

  onBack() {
    this.blogService.gotoParent();
  }

 }
