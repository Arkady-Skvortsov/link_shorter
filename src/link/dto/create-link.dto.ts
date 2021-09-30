export default interface CreateLinkDTO {
  readonly url: string;
  readonly short_url: string;
  readonly custom_link?: string;
}
