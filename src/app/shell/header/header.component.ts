import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService, I18nService } from '@app/core';
import { User } from '../../shared/interfaces/index';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  public user: User;
  public bchFile: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.url
    .pipe(map((url) => {
      return url[0] ? url[0].toString() : '';
    }))
    .subscribe(bchfile => {
      this.bchFile = bchfile;
    });
  }

  logout() {
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }
}
