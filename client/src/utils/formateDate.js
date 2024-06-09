export const formatDateInput = (date) => {
   if (!date) return '';
   const d = new Date(date);
   const month = (`0${d.getMonth() + 1}`).slice(-2);
   const day = (`0${d.getDate()}`).slice(-2);
   const year = d.getFullYear();
   return `${year}-${month}-${day}`;
 };

 export const formatDateDisplay = (dateString) => {
   if (!dateString) return '';
   const date = new Date(dateString);
   const day = (`0${date.getDate()}`).slice(-2);
   const month = (`0${date.getMonth() + 1}`).slice(-2);
   const year = date.getFullYear();
   return `${day}-${month}-${year}`;
 };