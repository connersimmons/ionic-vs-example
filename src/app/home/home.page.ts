import { Component, OnInit } from "@angular/core";
import { Contact } from "../contact";
import { ContactsService } from "../contacts.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  contacts: Array<Contact> = new Array<Contact>();

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.contactsService.getContacts().subscribe((res) => {
      this.contacts = res["results"];
      console.log(this.contacts);
      this.contacts.sort((a, b) => (a.name.last < b.name.last ? -1 : 1));
    });
  }

  myHeaderFn = (record, recordIndex, records) => {
    let result = null;
    if (recordIndex !== 0) {
      const c1 = record;
      const c2 = records[recordIndex - 1];
      if (c1.name.last != null && c2.name.last != null) {
        if (
          c1.name.last.charAt(0).toUpperCase() !==
          c2.name.last.charAt(0).toUpperCase()
        ) {
          result = c1.name.last.charAt(0).toUpperCase();
        }
      }
    } else {
      const name = record.name.last;
      if (name != null) {
        result = name.charAt(0).toUpperCase();
      }
    }
    return result;
  };
}
