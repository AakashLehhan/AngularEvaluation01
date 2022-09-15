import { Component, OnInit } from '@angular/core';
import { CardDetailsCrudService } from '../card-details-crud.service';

@Component({
  selector: 'app-payment-details-list',
  templateUrl: './payment-details-list.component.html',
  styleUrls: ['./payment-details-list.component.css']
})
export class PaymentDetailsListComponent implements OnInit {

  constructor(private cardService: CardDetailsCrudService) { }
  cards: any = [];
  ngOnInit(): void {
    this.cardService.getList().subscribe((result) => {
      console.log(result);
      this.cards = result;
    })
  }
  deleteDetails(id:any) {
    //Note : This data we have delete it from cards array also.
    this.cards.splice(id - 1, 1)
    this.cardService.deleteDetails(id).subscribe((result) => {
      console.warn(result)
    })
  }
  updateDetails(id:any) {
    console.log(id);
    this.cardService.populateForm(id);
  }

}
