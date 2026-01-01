import { Schema } from 'effect';
export declare const Stack: Schema.Struct<{
    Id: typeof Schema.Number;
    Name: typeof Schema.String;
    EndpointId: typeof Schema.Number;
}>;
export type Stack = typeof Stack.Type;
export declare const Stacks: Schema.Array$<Schema.Struct<{
    Id: typeof Schema.Number;
    Name: typeof Schema.String;
    EndpointId: typeof Schema.Number;
}>>;
export type Stacks = typeof Stacks.Type;
//# sourceMappingURL=Stack.d.ts.map