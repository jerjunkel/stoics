export default interface IRepository<T> {
  add(element: T): void;
  remove(id: string): void;
  get(id: string): Promise<T>;
  find(id: string): Promise<T[]>;
}
