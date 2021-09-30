export default interface ILink<T, R> {
  get_all_links(): Promise<T[]>;
  get_current_link(url: R): Promise<T>;
  create_link(dto: T): Promise<T>;
  update_current_link(title: R, dto: T): Promise<T>;
  delete_current_link(title: R): Promise<number>;
}
