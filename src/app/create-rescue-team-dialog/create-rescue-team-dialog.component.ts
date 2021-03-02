import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RescueTeam} from '../model/RescueTeam';

@Component({
  selector: 'app-create-rescue-team-dialog',
  templateUrl: './create-rescue-team-dialog.component.html',
  styleUrls: ['./create-rescue-team-dialog.component.css']
})
export class CreateRescueTeamDialogComponent implements OnInit {
  rescueTeam: RescueTeam = new RescueTeam('',0,0,'','','');
  selectedValue:any;
  fire:any;
  crime:any;
  medical:any;
  SelectedEmployee:any[]=[];
  rescueTeamForm = new FormGroup({
    name:new FormControl(),
    selectedEmployee:new FormControl(),
    fire:new FormControl(),
    medical:new FormControl(),
    crime:new FormControl(),
    location:new FormControl(),
  })
  
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private FormBuilder:FormBuilder) { 
   
    
  }
  countries=['a','b','c'];
  ngOnInit(): void {
  }

  close(){
    this.dialog.closeAll();
  }

  createRescueTeam(){}
    
}
