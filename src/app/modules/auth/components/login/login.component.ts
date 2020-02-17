import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  public showSpinner = false;

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

  login = () => {
    this.authService.login();
    this.router.navigateByUrl(this.redirectUrl);
  }

}
