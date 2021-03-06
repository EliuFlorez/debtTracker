import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { BillData } from '../../providers/bill-data';
import { AuthData } from '../../providers/auth-data';
import { CreateBillPage } from '../create-bill/create-bill';
import { BillDetailPage } from '../bill-detail/bill-detail';
import { LandingPage } from '../landing/landing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public billList: any;
  constructor(public navCtrl: NavController, public billData: BillData,
    public actionCtrl: ActionSheetController, public platform: Platform, 
    public authData: AuthData) {
    this.billList = this.billData.getBillList();
  }

  createBill(){
    this.navCtrl.push(CreateBillPage);
  }

  goToPaidBill(billId){
    this.navCtrl.push(BillDetailPage, {
      billId: billId
    });
  }

  moreBillOptions(billId){
    let action = this.actionCtrl.create({
      title: 'Modify your bill',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.billData.removeBill(billId);
          }
        },
        {
          text: 'More details',
          icon: !this.platform.is('ios') ? 'play' : null,
          handler: () => {
            this.navCtrl.push(BillDetailPage, {
              billId: billId
            });
          }
        },
        {
          text: 'Mark as Paid!',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.billData.payBill(billId);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    action.present();
  }

  logMeOut() {
    this.authData.logoutUser().then( () => {
      this.navCtrl.push(LandingPage);
    });
  }
}
