export default interface BaseVacation {
  destination: string;
  description: string;
  vacationStart: Date | string;
  vacationEnd: Date | string;
  price: number;
}
