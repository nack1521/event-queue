import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type OrderDocument = Order & Document;

export type OrderStatus =
  | 'ready-to-ship' | 'shipped' | 'complete' ;

export class OrderLine {
    @Prop({ required: true, type: String })
    sku!: string;

    @Prop({ required: true, type: Number })
    qty!: number;

    @Prop({ required: true, type: String })
    warehouseId!: string;
}

@Schema({
    timestamps: true
})
export class Order {
  @Prop({ type: String, required: true, enum: [ 'ready-to-ship', 'shipped', 'complete', ] })
  status!: OrderStatus;

  @Prop({ required: true, default: 0, type: Number })
  version!: number;

  @Prop({ type: [OrderLine], required: true })
  lines!: OrderLine[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
