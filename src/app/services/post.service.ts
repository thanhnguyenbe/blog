/* exercices openclassrooms.com Nguyen thi */
import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Blog } from '../models/blog';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable({
  providedIn: 'root'
})
export class PostService {


  blogs: Blog[] = [];
  blogSubject = new Subject<Blog[]>();

  title = 'Blog';
  counterSubscription: Subscription;

  constructor(private router: Router) {
    this.getBlogs();
  }

  getBlogs() {
    firebase.database().ref('/blogs')
    .on('value', (data: DataSnapshot) => {
      this.blogs = data.val() ? data.val() : [];
      this.emitSubject();
    });

  }

  emitSubject(): any {
    if (this.blogs !== null) {
      this.blogSubject.next(this.blogs);
    }

  }

  gotoParent(): any {
    this.router.navigate(['/posts']);
  }

  createBlog(newBlog: Blog): any {
    this.blogs.push(newBlog);
    console.log('list of blogs : ' + this.blogs.length);
    this.saveBlogs();
    this.emitSubject();
  }

  saveBlogs(): any {
    firebase.database().ref('/blogs').set(this.blogs);
  }

  getBlogItem(id: number) {
    return new Promise(
       (resolve, reject) => {
          firebase.database().ref('/blogs/' + id).once('value').then(
          (data: DataSnapshot) => {
              resolve(data.val());
          }, (error) => {
              reject(error);
          });
      });
  }

  updateLoveIts(id: number, blog: Blog) {
    firebase.database().ref('blogs/' + id).update({
        loveIts : blog.loveIts
        });

    this.saveBlogs();
    this.emitSubject();

  }

  removeBlog(blogIdexToRemove: number) {

    this.blogs.splice(blogIdexToRemove, 1);

    this.saveBlogs();

    this.emitSubject();

  }

}
