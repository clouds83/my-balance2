import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Category } from "../../categories/shared/category.model";
import { CategoryService } from "../../categories/shared/category.service";

import { Entry } from "../../entries/shared/entry.model";
import { EntryService } from "../../entries/shared/entry.service";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  currentMonth: any = new Date().getMonth() + 1;
  currentYear: any = new Date().getFullYear();

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  categories: Category[] = [];
  entries: Entry[] = [];

  @ViewChild("month", { static: true }) month: ElementRef = null;
  @ViewChild("year", { static: true }) year: ElementRef = null;

  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService
      .getAll()
      .subscribe((categories) => (this.categories = categories));

    this.entryService
      .getByMonthAndYear(this.currentMonth, this.currentYear)
      .subscribe(this.setValues.bind(this));
  }

  prevMonth() {
    if (this.currentMonth > 1 && this.currentMonth <= 12) {
      this.currentMonth--;
    } else {
      this.currentMonth = 12;
      this.currentYear--;
    }

    this.entryService
      .getByMonthAndYear(this.currentMonth, this.currentYear)
      .subscribe(this.setValues.bind(this));
  }

  nextMonth() {
    if (this.currentMonth > 0 && this.currentMonth <= 11) {
      this.currentMonth++;
    } else {
      this.currentMonth = 1;
      this.currentYear++;
    }

    this.entryService
      .getByMonthAndYear(this.currentMonth, this.currentYear)
      .subscribe(this.setValues.bind(this));
  }

  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if (!month || !year) {
      alert("Select month and year to generate your report");
    } else {
      this.entryService
        .getByMonthAndYear(month, year)
        .subscribe(this.setValues.bind(this));
    }
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach((entry) => {
      if (entry.type == "revenue") revenueTotal += +entry.amount;
      else expenseTotal += +entry.amount;
    });

    this.expenseTotal = expenseTotal;
    this.revenueTotal = revenueTotal;
    this.balance = revenueTotal - expenseTotal;
  }

  private setChartData() {
    this.revenueChartData = this.getChartData(
      "revenue",
      "Income chart",
      "#46bb00"
    );
    this.expenseChartData = this.getChartData(
      "expense",
      "Expenses chart",
      "#db0000"
    );
  }

  private getChartData(entryType: string, title: string, color: string) {
    const chartData = [];

    this.categories.forEach((category) => {
      // filtering entries by category and type
      const filteredEntries = this.entries.filter(
        (entry) => entry.categoryId == category.id && entry.type == entryType
      );

      // if found entries, then sum entries amount and add to chartData
      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + +entry.amount,
          0
        );

        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount,
        });
      }
    });

    return {
      labels: chartData.map((item) => item.categoryName),
      datasets: [
        {
          label: title,
          backgroundColor: color,
          data: chartData.map((item) => item.totalAmount),
        },
      ],
    };
  }
}
