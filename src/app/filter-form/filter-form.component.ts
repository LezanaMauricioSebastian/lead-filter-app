
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs';
import { DataServiceService } from '../data-service.service';


@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})

export class FilterFormComponent {
  filters = {
    role: '',
    industry: '',
    country: '',
    cnae: ''
  };

  roles: any[] = [];
  industries: any[] = [];
  countries: any[] = [];
  cnaes: any[] = [];

  constructor(private dataService:DataServiceService) {}
 
  ngOnInit(): void {
    this.loadRoles();
    this.loadIndustries();
    this.loadCountries();
    this.loadCNAEs();
  }

  loadRoles(): void {
    this.dataService.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  loadIndustries(): void {
    this.dataService.getIndustries().subscribe(data => {
      this.industries = data;
    });
  }

  loadCountries(): void {
    this.dataService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  loadCNAEs(): void {
    this.dataService.getCNAEs().subscribe(data => {
      this.cnaes = data;
    });
  }
  onSubmit() {
  

      this.dataService.postDATA(this.filters).subscribe(
        (blob) => {
          FileSaver.saveAs(blob, 'filtered_leads.csv');
        },
        (error) => {
          console.error('There was an error!', error);
          error.error.text().then((text: string) => {
            console.error('Error response body:', text);
            alert(`There was an error: ${text}`);
          });
          // Additional logging
          console.error('Error status:', error.status);
          console.error('Error status text:', error.statusText);
          console.error('Error body:', error.error);
        }
      );
    
  }
}
