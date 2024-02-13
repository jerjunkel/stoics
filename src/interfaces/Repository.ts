export default interface IRepository<T> {
  create(element: T): Promise<Boolean>;
  remove(id: string): void;
  get(id: string): Promise<T | null>;
  find(filter: {}): Promise<T[]>;
}
