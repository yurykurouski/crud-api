import { Serializable } from "child_process";
import cluster, { Worker } from "cluster";
import { cpus } from 'os';

import { MESSAGE_NO_USER, REQUESTS } from "./constants";
import { UserStore } from "./store";



const cpusNum = cpus().length;

class Balancer {
  private _workers: { [key: string]: Worker };
  private _lastWorkerID: number;
  private _storage: UserStore | null;

  constructor() {
    this._workers = {};
    this._lastWorkerID = 0;
    this._storage = null;
  }

  private set lastWorkerID(workerID: number) {
    this._lastWorkerID = workerID;
  }
  private get lastWorkerID(): number {
    return this._lastWorkerID;
  }
  public set storage(storage: UserStore) {
    this._storage = storage;
  }
  public get storage(): UserStore | null {
    return this._storage;
  }
  public addWorker(worker: Worker): void {
    this._workers[worker.id] = worker;
  }

  private incrementWorkerID() {
    return this.lastWorkerID += 1;
  }

  private getWorkerByID(workerID: number): Worker {
    return this._workers[workerID];
  }

  public getNextWorker(): Worker {
    if (this.lastWorkerID === cpusNum - 1) {
      this.lastWorkerID = 1;
      return this._workers[this.lastWorkerID];
    } else {
      return this._workers[this.incrementWorkerID()];
    }
  }

  public listen() {
    cluster.on('message', (worker, msg) => {
      switch (msg.type) {
        case REQUESTS.GET_USERS:
          worker.send(this._storage?.getUsers() ?? '');
          break;
        case REQUESTS.GET_USER:
          worker.send(this._storage?.getUser(msg.param) ?? '');
          break;
        case REQUESTS.DELETE_USER:
          try {
            worker.send(this._storage?.deleteUser(msg.param) ?? '');
          } catch (e) {
            worker.send(MESSAGE_NO_USER);
          }
          break;
        case REQUESTS.POST_USER:
          worker.send(this._storage?.createUser(JSON.parse(msg.param)) as Serializable);
          break;
        case REQUESTS.PUT_USER:
          worker.send(this._storage?.updateUser(msg.param.userId, msg.param.data) ?? '');
      }

      console.log(`cluster got msg from worker #${worker.id}:`, msg);
    });
  }

  public sendMessage(data: unknown) {
    process.send?.(data);
  }
}

export const balancer = new Balancer();