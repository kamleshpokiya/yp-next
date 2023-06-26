// packages
import { format } from 'date-fns';


// types
type FormatType = 'dd-MM-yyyy' | 'dd-MM-yyyy hh:mm a';

// formate date to given formate
export const formatDate = (date: Date, formatType: FormatType = 'dd-MM-yyyy'): string => {
    return date ? format(new Date(date), formatType) : '';
}









