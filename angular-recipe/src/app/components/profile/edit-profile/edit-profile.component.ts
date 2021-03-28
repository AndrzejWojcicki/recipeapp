import { TokenStorageService } from './../../../services/authentication/token-storage.service';
import { UserDetailsService } from './../../../services/userdetails.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  form: any = {};
  currentUser: any;
  isSuccessful = false;
  isEditFailed = false;
  errorMessage = '';
  user: User = new User();

  constructor(
    // tslint:disable-next-line: variable-name
    private _activatedRoute: ActivatedRoute,
    private userDetailsService: UserDetailsService,
    private tokenStorage: TokenStorageService,
    private userDetials: UserDetailsService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.getUserInfo();
  }

  onSubmit(): void {
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    this.userDetailsService.updateUser(id, this.form).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isEditFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isEditFailed = true;
      }
    );
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  getUserInfo(): void {
    this.userDetials
      .getUserDetials(this.currentUser.username)
      .subscribe((data) => {
        this.user = data;
        this.form.userName = this.user.userName;
        this.form.firstName = this.user.firstName;
        this.form.lastName = this.user.lastName;
      });
  }
}
