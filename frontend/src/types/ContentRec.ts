export interface ContentRec {
    showId: string;
    // any property matching "rec" + number will be a string
    [key: `rec${number}`]: string;
  }