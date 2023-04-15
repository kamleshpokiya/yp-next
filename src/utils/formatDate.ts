import { format } from 'date-fns';

type FormatType = 'dd-MM-yyyy' | 'dd-MM-yyyy hh:mm a';


export const formatDate = (date: Date, formatType: FormatType = 'dd-MM-yyyy'): string => {
    return date ? format(new Date(date), formatType) : '';
}









