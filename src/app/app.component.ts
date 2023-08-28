import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TradeSocketService } from './trade-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'company', headerName: 'Company' },
    { field: 'description', headerName: 'Description' },
    { field: 'initial_price', headerName: 'Initial Price' },
    { field: 'price_2002', headerName: 'Price 2002' },
    { field: 'price_2007', headerName: 'Price 2007' },
    { field: 'symbol', headerName: 'Symbol' },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  destroyed$ = new Subject();
  messages: string[] = [];

  constructor(
    private http: HttpClient,
    private tradeService: TradeSocketService
  ) {}

  ngOnInit(): void {
    const tradeSub$ = this.tradeService
      .connect('test')
      .pipe(takeUntil(this.destroyed$));

    tradeSub$.subscribe((message) => this.messages.push(message));
  }

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http.get<any[]>(
      'https://gist.githubusercontent.com/tanveery/4ac939d2ad27954da4c8db13e10ef7bd/raw/0f3a58c5735553515aa7c826cb37f58da387be2c/sample-stocks-data.json'
    );
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
