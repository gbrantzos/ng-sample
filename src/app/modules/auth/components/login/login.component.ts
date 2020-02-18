import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public working = false;
  public errorMessage = '';

  public username: string;
  public password: string;


  private redirectUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.redirectUrl = this.route.snapshot.queryParams.redirectUrl || '/main';

    // If user is logged in, got to main
    if (this.authService.isLogged) {
      this.router.navigate(['/main']);
    }
  }

  login() {
    this.working = true;
    this.errorMessage = '';

    this.authService
      .login()
      .pipe(
        finalize(() => this.working = false)
      )
      .subscribe(
        _ => {
          console.log('On subscribe...');
          this.router.navigateByUrl(this.redirectUrl);
        },
        error => {
          console.error(error);
          this.errorMessage = error;
        }
      );
  }

}
