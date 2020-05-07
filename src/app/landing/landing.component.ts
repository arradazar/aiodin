import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Appointment } from '../services/appointment.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
  branches = ["Branch"];

  appointmentForm: FormGroup;
  appointment:  Appointment;
  submittedAppointment: Appointment = { status : 1 , messages:"Setting Appointment", data: []};

  constructor(private fb: FormBuilder, 
    private apiService: ApiService) { }

  ngOnInit() {
    // start site timer
    this.startTimer();
    // initialize make appointment form
    this.createForm();
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

  // convert timer data into string
  transform(value: number): string {
    var sec_num = value; 
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours <= 0) {
      return 'Adoption Fair already expired!';
    }

    return hours+' hours '+minutes+' mins '+seconds+ ' secs left';
  }

  createForm() {
    this.appointmentForm = this.fb.group({
      _date: [new Date(), ''],
      _state: [this.states[0], ''],
      _branch: [this.branches, '']
    });
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
    this.appointmentForm.patchValue({
      _branch: this.branches
    });
  }

  makeAppointment() {
    this.submittedAppointment.data[0] = this.appointmentForm.get('_date').value;
    this.submittedAppointment.data[1] = this.appointmentForm.get('_state').value;
    this.submittedAppointment.data[2] = this.appointmentForm.get('_branch').value;
    this.createAppointment();
    console.log("Date: ", this.appointmentForm.get('_date').value);
    console.log("State: ", this.appointmentForm.get('_state').value);
    console.log("Branch: ", this.appointmentForm.get('_branch').value);
  }

  createAppointment() {
    this.apiService.createAppointment(this.submittedAppointment).subscribe((appointment: Appointment)=>{
      console.log("Appointment created, ", appointment);
      Swal.fire({
        title: appointment.messages,
        icon: 'success',
        html:
        'Here are the details:<br>' +
        'Date: ' + appointment.data[0] + '<br>' +
        'State: ' + appointment.data[1] + '<br>' +
        'Branch: ' + appointment.data[2]
      });
    });
  }


}
