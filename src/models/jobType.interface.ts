export default interface Job {
  id: string;
  type: string;
  url: string;
  created_at: Date;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
}
