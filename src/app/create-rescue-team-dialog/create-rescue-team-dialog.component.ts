import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-rescue-team-dialog',
  templateUrl: './create-rescue-team-dialog.component.html',
  styleUrls: ['./create-rescue-team-dialog.component.css']
})
export class CreateRescueTeamDialogComponent implements OnInit {

  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  close(){
    this.dialog.closeAll();
  }
    
}
