import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { Injectable } from "@nestjs/common";

export const STOCK_QUEUE = 'stockQueue';

@Injectable()
export class StockQueue{
    constructor(@InjectQueue(STOCK_QUEUE) public readonly q: Queue){}
}