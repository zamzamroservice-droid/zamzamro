// "Jobs We Were Trusted With" — REAL projects with owner-approved photographs ONLY.
// CONFIRM: no approved job photos have been supplied yet, so this list is empty and the
// Services page shows a clearly-marked placeholder instead of invented client work.
// To publish a job, add an entry and put its photo in assets/raw → run `npm run images`.
export interface Work {
  title: string;
  location: string;
  type: string;
  image: string;
  alt: string;
}

export const works: Work[] = [];
