import { Component, OnInit } from '@angular/core';
import { Post } from '@app/shared/interfaces/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as showdown from 'showdown';
import { map } from 'rxjs/operators';

const converter = new showdown.Converter();

declare var SimpleWallet: any;
declare var LZUTF8: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  post: Post;
  isLoading = true;
  postId: number;
  err: any;
  parentPostId: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    const simpleWallet = new SimpleWallet();

    this.activatedRoute.url
    .pipe(map((url) => {
      return url[0] ? url[0].toString() : '';
    })).subscribe(bchfile => {
        (async () => {
          const encodedPost = await simpleWallet.download(bchfile);

          this.post = JSON.parse(LZUTF8.decompress(encodedPost.data, { inputEncoding: 'Base64' }));

          this.post.body = converter.makeHtml(this.post.body);

          this.isLoading = false;
        })();
    });
  }
}
