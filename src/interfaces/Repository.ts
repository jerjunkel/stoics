export default interface IRepository<T> {
  create(element: T): Promise<T>;
  remove(id: string): void;
  find(id: string): Promise<T | null>;
  findAll(filter: {}): Promise<T[]>;)
}
