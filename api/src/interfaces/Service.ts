import IRepository from "./Repository.js";

export default interface IService<T> {
  readonly repository: IRepository<T>;
}
