export default interface IRepository<T> {
  create(element: T): Promise<T>;
  find(id: string): Promise<T | null>;
  findAll(filter: {}): Promise<T[]>;
  update(id: string, update: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
}
