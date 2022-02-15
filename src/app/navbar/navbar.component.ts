import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges, OnDestroy {

  barColor = true;
  counter = 0
  counterIncrementer!: Subscription

  @Input("input") input: any

  constructor(private auth: AuthService,
    private data: DataService) { }

  
    

  ngOnChanges(): void {
    console.log("input", this.input)
    this.barColor = this.input
  }

  ngOnInit(): void {
    this.counterIncrementer = this.data.getClickEvent().subscribe(() => {
      this.counter += 1 
    })
  }

  ngOnDestroy(): void {
    this.counter = 0
    this.counterIncrementer.unsubscribe()
  }

  logOut(){
    this.auth.signOut()
  }

}
