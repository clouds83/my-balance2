import { Component, Input } from "@angular/core";
import { BaseResourceListComponent } from "../../../shared/components/base-resource-list/base-resource-list.component";
import { Entry } from "../../entries/shared/entry.model";
import { EntryService } from "../../entries/shared/entry.service";

@Component({
  selector: "app-monthly-list",
  templateUrl: "./monthly-list.component.html",
  styleUrls: ["./monthly-list.component.scss"],
})
export class MonthlyListComponent extends BaseResourceListComponent<Entry> {
  @Input() entries: any;
  @Input() entryT: any;

  constructor(private entryService: EntryService) {
    super(entryService);
  }
}
