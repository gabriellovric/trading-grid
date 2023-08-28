import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth.service';
import {
  dateFormatter,
  dateTimeFormatter,
  numberFormatter,
  rateFormatter,
} from '../formatters';
import { Trade } from '../trade';
import { TradeSocketService } from '../trade-socket.service';

@Component({
  selector: 'app-trade-grid',
  templateUrl: './trade-grid.component.html',
  styleUrls: ['./trade-grid.component.scss'],
})
export class TradeGridComponent {
  public columnDefs: ColDef[] = [
    {
      field: 'tradeDate',
      headerName: 'Trade Date',
      valueFormatter: ({ value }) => dateTimeFormatter(value),
    },
    {
      field: 'purchaseDate',
      headerName: 'Purchase Date',
      valueFormatter: ({ value }) => dateFormatter(value),
    },
    {
      field: 'repurchaseDate',
      headerName: 'Repurchase Date',
      valueFormatter: ({ value }) => dateFormatter(value),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      valueFormatter: ({ value }) => numberFormatter(value),
    },
    {
      field: 'repoRate',
      headerName: 'Repo Rate',
      valueFormatter: ({ value }) => rateFormatter(value),
    },
    { field: 'collateral', headerName: 'Collateral' },
    { field: 'initiator', headerName: 'Initiator' },
    { field: 'responder', headerName: 'Responder' },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public trades: Trade[] = [];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  destroyed$ = new Subject();

  constructor(
    private authService: AuthService,
    private tradeService: TradeSocketService
  ) {}

  ngOnInit(): void {
    const username = this.authService.getUsername();

    const tradeSub$ = this.tradeService
      .connect(username)
      .pipe(takeUntil(this.destroyed$));

    tradeSub$.subscribe((trade) => (this.trades = [trade, ...this.trades]));
  }
}
