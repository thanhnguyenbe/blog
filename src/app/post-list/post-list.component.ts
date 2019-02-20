/* exercices openclassrooms.com Nguyen thi */
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Blog } from '../models/blog';
import { Subscription } from 'rxjs';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  blogs: Blog[];
  blogSubscription: Subscription;

  @Input() title: string;
  @Input() content: string;
  @Input() loveIts: number;
  @Input() created: Date;

  projectTitle = 'Bienvenue sur nos blogs !';
  aBlanc = '   ';


  constructor(private blogService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.blogSubscription = this.blogService.blogSubject.subscribe(
      (blogs: Blog[]) => {
          this.blogs = blogs;
          }
      );
    this.blogService.getBlogs();
    this.blogService.emitSubject();

  }

  ngOnDestroy(): void {
    this.blogSubscription.unsubscribe();
  }

  onViewBlog(id: number) {
   this.router.navigate(['/posts', 'view', id]);
  }

  getLoveIts(id: number) {
    return this.blogs[id].loveIts;
  }


  clickButtonLoveIts(id: number) {
    this.blogs[id].loveIts++;
    this.blogService.updateLoveIts(id, this.blogs[id]);
  }

  clickButtonNotLoveIts(id: number) {
    this.blogs[id].loveIts--;
    this.blogService.updateLoveIts(id, this.blogs[id]);
  }

  onDeleteBlog(id: number) {
    this.blogService.removeBlog(id);
  }

}
