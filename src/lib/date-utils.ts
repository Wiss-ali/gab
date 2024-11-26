import { format, getDaysInMonth } from 'date-fns';
import { fr } from 'date-fns/locale';

export function getMonthName(month: number): string {
  const date = new Date(2024, month - 1, 1);
  return format(date, 'MMMM', { locale: fr });
}

export function getMonthPeriod(month: number): string {
  const year = 2024;
  const startDate = new Date(year, month - 1, 1);
  const daysInMonth = getDaysInMonth(startDate);
  const endDate = new Date(year, month - 1, daysInMonth);
  
  return `${format(startDate, 'd', { locale: fr })} au ${format(endDate, 'd', { locale: fr })} ${format(startDate, 'MMMM', { locale: fr })}`;
}