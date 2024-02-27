import 'reflect-metadata';

function Test(target: Function): void {
	Reflect.defineMetadata('key', 1, target);
	const meta = Reflect.getMetadata('key', target);
	console.log(meta);
}

function Prop(target: Object, name: string): void {}

@Test
export class C {
	@Prop prop: number;
}
