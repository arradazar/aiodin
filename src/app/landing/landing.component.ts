import { Component, OnInit } from '@angular/core';
import { Observable, timer, NEVER, BehaviorSubject, fromEvent, of } from 'rxjs';
import { map, tap, takeWhile, share, startWith, switchMap, filter } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'landing-page',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  time: number = 16200;
  display: any;
  interval: any ;
  states = ["State", "State A", "State B", "State C", "State D"]
  stateA = ["BranchA", "BranchA1"];
  stateB = ["BranchB", "BranchB1", "BranchB2", "BranchB3"];
  stateC = ["BranchC"];
  stateD = ["BranchD", "BranchD1","BranchD2"];
  branches: any;

  appointmentForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.startTimer();

    this.appointmentForm = this.fb.group({
      _state: this.states,
      _branch: ['Branch'],
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time--;
      } else {
        this.time--;
      }
      this.display=this.transform(this.time)
    }, 1000);
  }

  transform(value: number): string {
    var sec_num = value; 
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    return hours+' hours '+minutes+' mins '+seconds+ ' secs left';
  }

  selectChanged(selectedValue:any) {
    switch(selectedValue.target.value) {
      case "State A":
        this.branches =  this.stateA;
        break;
      case "State B":
        this.branches =  this.stateB;
        break;
      case "State C":
        this.branches =  this.stateC;
        break;
      case "State D":
        this.branches =  this.stateD;
        break;
      default:
        console.log("Default");
        break;
    }
    this.appointmentForm = this.fb.group({
      _branch: this.branches
    });
  }

}
