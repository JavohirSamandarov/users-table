import { Component, OnInit } from '@angular/core';
import { Users } from './users';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dic-users',
  imports: [CommonModule, TableModule, BadgeModule, InputTextModule, AutoCompleteModule, FormsModule],
  standalone: true,
  templateUrl: './dic-users.html',
  styleUrls: ['./dic-users.scss'],
})
export class DicUsers implements OnInit {
   users: any[] = [];
  loading = false;
  totalRecords = 0;
  rows = 10;
  page = 1;

  filterValue: string = '';

  // country uchun
  selectedCountry: any = null;
  filteredCountries: any[] = [];
  allCountries: any[] = [];
  

  constructor(private usersService: Users) {}

  ngOnInit() {
    this.loadUsers(this.page, this.rows);
  }

  onFilter(event: any) {
    this.filterValue = event.target.value;
    this.loadUsersLazy({ first: 0, rows: this.rows });
  }

  loadUsersLazy(event: any) {
    this.loading = true;

    const page = Math.floor(event.first / event.rows) + 1;
    const rows = event.rows;

    this.page = page;
    this.rows = rows;

    this.usersService.getUsers(this.page, this.rows).subscribe({
      next: (data) => {
        let rawUsers = data.data || [];

        // barcha countrylarni yig‘amiz
        this.allCountries = Array.from(new Set(rawUsers.map((u: any) => u.country)))
          .map((c: any) => ({ code: c, name: c }));

        if (this.filterValue) {
          const filter = this.filterValue.toLowerCase();
          rawUsers = rawUsers.filter((u: { username: string }) =>
            u.username?.toLowerCase().includes(filter)
          );
        }

        if (this.selectedCountry) {
          rawUsers = rawUsers.filter((u: any) => u.country === this.selectedCountry.code);
        }

        this.users = rawUsers;
        this.totalRecords = data.total || 0;
        this.loading = false;
      },
      error: (err) => {
        // console.error('Error loading users', err);
        this.loading = false;
      },
    });
  }

  loadUsers(page: number, rows: number) {
    page = Number(page) || 1;
    rows = Number(rows) || 10;
    this.loading = true;

    this.usersService.getUsers(page, rows).subscribe({
      next: (data) => {
        this.users = data.data || [];
        this.totalRecords = data.total || 0;

        this.allCountries = Array.from(new Set(this.users.map((u: any) => u.country)))
          .map((c: any) => ({ code: c, name: c }));

        this.loading = false;
      },
      error: (err) => {
        // console.error('Error loading users', err);
        this.loading = false;
      },
    });
  }

  onPageChange(event: any) {
    const newPage = typeof event.page === 'number' ? event.page + 1 : 1;
    const newRows = typeof event.rows === 'number' ? event.rows : this.rows;

    this.page = newPage;
    this.rows = newRows;

    this.loadUsers(this.page, this.rows);
  }

  // autocomplete uchun filter
  filterCountry(event: any) {
    const query = event.query.toLowerCase();
    this.filteredCountries = this.allCountries.filter((c) =>
      c.name.toLowerCase().includes(query)
    );
  }
  

  onCountrySelect() {
    this.loadUsersLazy({ first: 0, rows: this.rows });
  }

  onCountryClear() {
  this.selectedCountry = null;
  this.loadUsersLazy({ first: 0, rows: this.rows });
}
}
