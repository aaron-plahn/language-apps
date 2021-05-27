import { Component, OnInit } from '@angular/core';
import { Employee } from '../../types/Employee'; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // TODO Pull this data from server
  employees: Employee[] = [
    {'name': "Justin Bambrick", "title": "Front-End Developer"},
    {'name': "Blake Sellars", "title": "Development Assistant"},
    {'name':"Aaron Plahn", "title": "Technical Consultant"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}