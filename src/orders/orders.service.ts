// src/orders/orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockProducer } from '../stock-queue/stock.producer';
import { Order, OrderLine } from './schemas/order.shema';
import { faker } from '@faker-js/faker/locale/zu_ZA';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly OrderModel: Model<Order>,
    private readonly stockProducer: StockProducer,
  ) {}

  // เรียกตอนสถานะเปลี่ยน -> ส่ง event เข้า queue
  async markShipped(orderId: string) {
    const order = await this.OrderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    const version = (order.version ?? 0) + 1;

    // อัปเดตสถานะใน orders
    await this.OrderModel.updateOne({ _id: orderId }, { $set: { status: 'shipped', version } });

    // ส่ง event เหมือน express: queue.add(...)
    await this.stockProducer.enqueue({
      type: 'on-shipped',
      orderId,
      version,
      lines: order.lines.map(line => ({
        sku: line.sku,
        qty: line.qty || 0,
        warehouseId: line.warehouseId,
      })), // [{sku, qty, warehouseId}]
    });
    console.log(`Order ID: ${orderId}, Version: ${version}`);
    return { ok: true };
  }

  async markComplete(orderId: string) {
    const order = await this.OrderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    const version = (order.version ?? 0) + 1;
    await this.stockProducer.enqueue({
      type: 'on-complete',
      orderId,
      version,
      lines: order.lines.map(line => ({
        sku: line.sku,
        qty: line.qty || 0,
        warehouseId: line.warehouseId,
      })),
    });
    return { ok: true };
  }

  async createDummyOrder(): Promise<Order> {
    const dummyOrderLines: OrderLine[] = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      sku: faker.commerce.isbn(),
      qty: faker.number.int({ min: 1, max: 10 }),
      warehouseId: `WH-${faker.location.zipCode()}`,
    }));

    const dummyOrder = new this.OrderModel({
      status: 'ready-to-ship',
      version: 0,
      lines: dummyOrderLines,
    });

    return await dummyOrder.save();
  }
}

